import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

interface UserContextProps {
    userEmail: string | null;
}

const UserContext = createContext<UserContextProps>({ userEmail: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession();
    const userEmail = session?.user?.email ?? null;

    return <UserContext.Provider value={{ userEmail }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
