import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

interface UserContextProps {
    userId: string | null;
    userEmail: string | null;
    userImage: string | null;
    userName: string | null;
}

const UserContext = createContext<UserContextProps>({ userId: null, userEmail: null, userImage: null, userName: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id ?? null;
    const userEmail = session?.user?.email ?? null;
    const userImage = session?.user?.image ?? null;
    const userName = session?.user?.name ?? null;

    return <UserContext.Provider value={{ userId, userEmail, userImage, userName }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
