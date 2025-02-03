import Head from "next/head";
import { AuthenticatedRoute, Dashboard, Layout } from "components";
import { getDashboardData } from "@/app/services";
import { DashboardData } from "@/app/models/dashboard";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const { userEmail } = useUser();
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);

    useEffect(() => {
        if (userEmail) {
            getDashboardData(userEmail).then((data) => {
                console.log("Dashboard Data: ", data);
                setDashboard(data);
            });
        }
    }, [userEmail]);

    return (
        <AuthenticatedRoute>
            <Head>
                <title>Sales-App</title>
            </Head>
            <div className="h-screen">
                <Layout title="Dashboard">
                    <Dashboard
                        customers={dashboard?.customers || 0}
                        products={dashboard?.products || 0}
                        sales={dashboard?.sales || 0}
                        salesByMonth={dashboard?.salesByMonth}
                    />
                </Layout>
            </div>
        </AuthenticatedRoute>
    );
};

export default Home;
