export type UserContextType = {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

type UserType = "NORMAL" | "ADMIN"

export type User = {
    userId: string,
    name: string,
    type: UserType,
    clientId: string;
}

export type TabType = "LoanDocuments" | "SideLetters" | "LPA" | "ValuationMemo" | "StatusDashboard" | "GridNegotiation" | "ClientManagement";

interface TabConfig {
  columns: string[];
  filters: Record<string, string>;
}

type Tabs = Partial<Record<TabType, TabConfig>>;

export interface EffectiveUserEntitlementResponse {
  userId: string;
  clientId: string;
  tabs: Tabs;
}