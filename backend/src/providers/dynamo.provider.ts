import { ddbDocClient } from "../config/dynamo.config";

export const DYNAMO_PROVIDER = "DYNAMO_DOCUMENT_CLIENT";

export const DynamoProvider = {
  provide: DYNAMO_PROVIDER,
  useFactory: () => ddbDocClient,
};
