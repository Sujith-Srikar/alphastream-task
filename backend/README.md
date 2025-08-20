project-root/
├── src/
│   ├── controllers/
│   │   ├── entitlement.controller.ts
│   │   ├── user.controller.ts
│   │   ├── client.controller.ts 
│   │   └── index.ts              # exports all controllers
│   │
│   ├── services/
│   │   ├── entitlement.service.ts
│   │   ├── user.service.ts
│   │   ├── client.service.ts 
│   │   └── index.ts              # exports all services
│   │
│   ├── dto/
│   │   └── dto.ts                # all DTOs and types in one file
│   │
│   ├── data/
│   │   ├── index.ts              # central export for mock data
│   │   ├── user.ts
│   │   ├── client.ts
│   │   ├── default.ts
│   │   └── entitlements.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── package.json
├── tsconfig.json
├── nest-cli.json                 # typical NestJS config
├── .eslintrc.js                  # linting
├── .prettierrc                   # formatting 
└── README.md                     # project doc 