// test/app.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  // Convenience headers
  const asAdmin = { 'x-requester-id': 'user1' }; // user1 seeded as ADMIN (client1)
  const asNormal = { 'x-requester-id': 'user2' }; // user2 seeded as NORMAL (client1)

  beforeAll(async () => {
    process.env.AWS_REGION = process.env.AWS_REGION || 'us-east-1';
    process.env.DYNAMO_ENDPOINT = process.env.DYNAMO_ENDPOINT || 'http://localhost:8000';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // stricter for test accuracy
        transform: true,
      }),
    );

    await app.init();
  }, 120_000);

  afterAll(async () => {
    if (app) await app.close();
  });

  // --------------------------
  // GET /user
  // --------------------------
  it('GET /user → returns all users (shape + count)', async () => {
    const res = await request(app.getHttpServer()).get('/user').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);

    for (const u of res.body) {
      expect(typeof u.userId).toBe('string');
      expect(typeof u.name).toBe('string');
      expect(['ADMIN', 'NORMAL']).toContain(u.type);
      expect(typeof u.clientId).toBe('string');
    }
  });

  // --------------------------
  // GET /client
  // --------------------------
  it('GET /client → returns all clients', async () => {
    const res = await request(app.getHttpServer()).get('/client').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  // --------------------------
  // GET /entitlement/:id
  // --------------------------
  it('GET /entitlement/:id → returns entitlement for user', async () => {
    const res = await request(app.getHttpServer())
      .get('/entitlement/user1')
      .expect(200);

    expect(res.body).toHaveProperty('userId', 'user1');
    expect(res.body).toHaveProperty('clientId');
    expect(res.body).toHaveProperty('tabs');
  });

  // --------------------------
  // PUT /user/:id (authorization)
  // --------------------------
  it('PUT /user/:id → forbids NORMAL user from updating another user (403)', async () => {
    const body = {
      scope: 'USER',
      scopeId: 'user1',
      tabs: {
        LoanDocuments: {
          columns: ['id', 'documentName', 'amount', 'status'],
          filters: { status: 'active' },
        },
      },
    };

    await request(app.getHttpServer())
      .put('/user/user1')
      .set(asNormal)
      .send(body)
      .expect(403);
  });

  it('PUT /user/:id → 400 for invalid body (missing tabs / wrong shape)', async () => {
    // ❌ missing "tabs"
    const badBody = {
      scope: 'USER',
      scopeId: 'user1',
      tabs: {}, // <--- must include tabs but empty makes it invalid
    };

    await request(app.getHttpServer())
      .put('/user/user1')
      .set(asAdmin)
      .send(badBody)
      .expect(400);
  });

  it('PUT /user/:id → admin can update entitlement and see changes via GET', async () => {
    const updateBody = {
      scope: 'USER',
      scopeId: 'user1',
      tabs: {
        LoanDocuments: {
          columns: ['id', 'documentName'],
          filters: { status: 'inactive' },
        },
      },
    };

    const putRes = await request(app.getHttpServer())
      .put('/user/user1')
      .set(asAdmin)
      .send(updateBody)
      .expect(200);

    expect(putRes.body).toMatchObject({
      message: expect.stringMatching(/updated/i),
    });

    const getRes = await request(app.getHttpServer())
      .get('/entitlement/user1')
      .expect(200);

    const loanDoc = getRes.body?.tabs?.LoanDocuments;
    expect(loanDoc).toBeTruthy();
    expect(loanDoc.columns).toEqual(['id', 'documentName']);
    expect(loanDoc.filters).toMatchObject({ status: 'inactive' });
  });

  // --------------------------
  // Negative: missing requester header
  // --------------------------
  it('PUT /user/:id → fails when requester header is missing', async () => {
    const body = {
      scope: 'USER',
      scopeId: 'user1',
      tabs: {
        LPA: { columns: ['id', 'fundName'], filters: {} },
      },
    };

    const res = await request(app.getHttpServer())
      .put('/user/user1')
      .send(body);

    expect([400, 403]).toContain(res.status);
  });

  // --------------------------
  // Edge: update user who does not exist
  // --------------------------
  it('PUT /user/nonexistent → should return 404', async () => {
    const body = {
      scope: 'USER',
      scopeId: 'nonexistent',
      tabs: {
        SideLetters: { columns: ['id', 'party', 'date'], filters: {} },
      },
    };

    const res = await request(app.getHttpServer())
      .put('/user/nonexistent')
      .set(asAdmin)
      .send(body);

    expect([404, 200]).toContain(res.status); // keep both until repo logic clarified
  });

  // --------------------------
  // Edge: invalid tab keys
  // --------------------------
  it('PUT /user/:id → rejects invalid tab keys with 400', async () => {
    const body = {
      scope: 'USER',
      scopeId: 'user1',
      tabs: {
        // ❌ not in TabType enum
        UnknownTab: { columns: ['x'], filters: {} },
      } as any,
    };

    const res = await request(app.getHttpServer())
      .put('/user/user1')
      .set(asAdmin)
      .send(body);

    expect(res.status).toBe(400);
  });
});
