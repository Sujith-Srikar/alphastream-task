## 📖 Overview
This task is an **Entitlement Management System** built with **NestJS (backend)**, **React + TypeScript (frontend)**, and **AWS DynamoDB (database)**.  
It manages **document access entitlements** (permissions) across multiple tabs such as Loan Documents, Side Letters, LPA, and Valuation Memos.  

The system ensures that:
- Users only see data they are **entitled** to.
- Filters and columns are **dynamically applied** based on entitlements.
- Admins can define **default entitlements** at user and client levels.

---

## 🛠️ Tech Stack

### Backend
- **NestJS** – REST API framework.
- **AWS DynamoDB** – NoSQL database.
- **AWS SDK v3** – For DynamoDB client operations.
- **TypeScript** – Strict typing for maintainability.

### Frontend
- **React + TypeScript** – Component-based UI.
- **Ant Design (antd)** – UI components (Table, Card, Select, DatePicker).
- **Context API** – For global entitlement management.
- **Day.js** – Date handling and formatting.

---

## ✨ Features
- **Dynamic Columns & Filters**: Each tab (Loan Docs, Side Letters, LPA, Valuation Memo) has configurable columns & filters.
- **Entitlement Enforcement**:
  - Users with no entitlement see a `NotAllowed` screen.
  - Filters are applied dynamically on table data.
- **Interactive Filters**:
  - Select from multiple values.
  - Apply date range filters with calendar UI.
- **Seeded Defaults**:
  - Client-wide defaults.
  - User-specific defaults.