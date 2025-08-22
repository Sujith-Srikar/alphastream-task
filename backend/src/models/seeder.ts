import { ddbDocClient } from "../config/dynamo.config";
import { schemas } from "./schema";
import {
  CreateTableCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import users from "../data/users"; 
import clients from "../data/client"; 
import defaultEntitlement from "../data/default"; 

async function recreateTables() {
  for (const schema of schemas) {
    try {
      console.log(`Dropping ${schema.input.TableName} if exists...`);
      await ddbDocClient.send(
        new DeleteTableCommand({ TableName: schema.input.TableName })
      );
    } catch {
      /* ignore if not exists */
    }
    console.log(`Creating ${schema.input.TableName}...`);
    await ddbDocClient.send(schema);
  }
  console.log("✅ Tables recreated");
}

async function seedUsers() {
  for (const u of users) {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "Users",
        Item: u,
      })
    );
  }
  console.log("✅ Users seeded");
}

async function seedClients() {
  for (const c of clients) {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "Clients",
        Item: c,
      })
    );
  }
  console.log("✅ Clients seeded");
}

async function seedEntitlements() {
  // Client Defaults
  for (const [tabKey, ent] of Object.entries(
    defaultEntitlement.clientDefault
  )) {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "Entitlements",
        Item: {
          scopeKey: "CLIENTDEFAULT",
          tabKey,
          ...ent,
        },
      })
    );
  }

  // User Defaults
  for (const [tabKey, ent] of Object.entries(defaultEntitlement.userDefault)) {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "Entitlements",
        Item: {
          scopeKey: "USERDEFAULT",
          tabKey,
          ...ent,
        },
      })
    );
  }

  console.log("✅ Default Entitlements seeded");
}

async function seed() {
  await recreateTables();
  await new Promise((r) => setTimeout(r, 5000)); 

  await seedUsers();
  await seedClients();
  await seedEntitlements();

  console.log("🌱 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
});
