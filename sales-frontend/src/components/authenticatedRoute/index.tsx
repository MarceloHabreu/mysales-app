import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface AuthenticatedRouteProps {
    children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (status !== "loading") {
            setIsLoading(false);
        }
    }, [status]);

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h2 className="text-xl text-center">Loading...</h2>
            </div>
        );
    }

    if (!session && !isLoading) {
        signIn();
        return null;
    }

    return <div>{children}</div>;
};
