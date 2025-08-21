import axios from "axios";
import {type User, type EffectiveUserEntitlementResponse} from "../types/types"
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/user`);
    return data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const fetchEffectiveUserEntitlement = async (
  userId: string
): Promise<EffectiveUserEntitlementResponse> => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/entitlement/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching entitlements for user ${userId}`, error);
    throw error;
  }
};

// Hooks
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