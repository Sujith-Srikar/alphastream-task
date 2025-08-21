import { useContext, createContext, useState, useEffect} from "react";
import { type UserContextType } from "../types/types";

export const UserContext =  createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }){
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setUserId(localStorage.getItem("userId"));
        }
    },[])

    return (
        <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};