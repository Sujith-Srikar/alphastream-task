import {type User, type EffectiveUserEntitlementResponse} from "../types/types"
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers, fetchEffectiveUserEntitlement } from "../api/userApi";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  })
}

export const useEffectiveUserEntitlement = (userId: string | null) => {
  return useQuery<EffectiveUserEntitlementResponse, Error>({
    queryKey: ["entitlements", userId],
    queryFn: () => fetchEffectiveUserEntitlement(userId!),
    enabled: !!userId,
    staleTime: Infinity
  });
}