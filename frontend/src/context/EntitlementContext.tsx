import { useContext, createContext } from "react";
import { useEffectiveUserEntitlement } from "../api/user";
import { type EffectiveUserEntitlementResponse } from "../types/types";
import { useUser } from "./UserContext";

type EntitlementContextType = {
  entitlements?: EffectiveUserEntitlementResponse;
  isLoading: boolean;
  error: unknown;
};

const EntitlementContext = createContext<EntitlementContextType | undefined>(
  undefined
);

export function EntitlementContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useUser();
  const {
    data: entitlements,
    isLoading,
    error,
  } = useEffectiveUserEntitlement(userId);

  return (
    <EntitlementContext.Provider value={{ entitlements, isLoading, error }}>
      {children}
    </EntitlementContext.Provider>
  );
}

export const useEntitlement = () => {
  const context = useContext(EntitlementContext);
  if (!context) {
    throw new Error(
      "useEntitlement must be used within an EntitlementContextProvider"
    );
  }
  return context;
};
