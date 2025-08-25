src/
│
├── api/
│   ├── user.ts              # API fetching
|
├── hooks/
│   ├── useApiHooks.ts      # API hooks
│
├── components/
│   ├── common/
│   │   ├── ActionButton.tsx # Calls useUser context
|   |
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │
│   ├── tables/
│   │   ├── Tables.tsx
│   │   ├── NotAllowed.tsx
│   │
│   └── index.ts             # global export
│
├── context/
│   ├── UserContext.tsx         # used to fetch all the users from backend api
│
├── pages/
│   ├── Dashboard.tsx       # uses useEntitlement Context
│   ├── Home.tsx            # uses useUsers custom hook for api, and actionbutton for navigation
│   └── index.ts             # global export
│
├── types/
│   ├── types.ts             # EffectiveUserEntitlementResponse, TabType, TabConfig, etc.
│   └── index.ts             # global export
│
├── App.tsx                  
├── main.tsx                 
└── index.css               
