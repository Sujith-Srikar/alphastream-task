project-root/
├── src/
│   ├── config/
│   │   └── dynamo.config.ts          # DynamoDB connection configuration
│   │
│   ├── controllers/                  # All route controllers
│   │   ├── entitlement.controller.ts
│   │   ├── user.controller.ts
│   │   ├── client.controller.ts 
│   │   └── index.ts                  # central export for controllers
│   │
│   ├── data/                         # mock in-memory seed data (replace with DB later)
│   │   ├── index.ts                  # central export
│   │   ├── user.ts
│   │   ├── client.ts
│   │   ├── default.ts
│   │   └── entitlements.ts
│   │
│   ├── models/                       # schemas, DTOs, validation
│   │   ├── dto.ts                    # DTOs and enums
│   │   ├── schema.ts                 # DB schema definition
│   │   └── seeder.ts                 # initial seed logic for DB
│   │
│   ├── providers/
│   │   └── dynamo.provider.ts        # DynamoDB provider (DI)
│   │
│   ├── repository/                   # Data access layer
│   │   ├── entitlement.repository.ts
│   │   ├── user.repository.ts
│   │   ├── client.repository.ts
│   │   └── index.ts                  # export all repositories
│   │
│   ├── services/                     # Business logic layer
│   │   ├── entitlement.service.ts
│   │   ├── user.service.ts
│   │   ├── client.service.ts 
│   │   └── index.ts                  # export all services
│   │
│   ├── app.module.ts                 # root module
│   └── main.ts                       # bootstrap entrypoint
│
├── test/
│   ├── app.e2e-spec.ts               # end-to-end tests
│   └── jest.e2e.json                 # test config
│
├── package.json
├── tsconfig.json
├── nest-cli.json                     # NestJS CLI config
├── .eslintrc.js                      # lint rules
├── .prettierrc                       # formatting rules
└── README.md                         # project documentation
