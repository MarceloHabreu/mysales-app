import Head from "next/head";
import { AuthenticatedRoute, Dashboard, Layout } from "components";
import { getDashboardData } from "@/app/services";
import { DashboardData } from "@/app/models/dashboard";

interface HomeProps {
    dashboard: DashboardData;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    return (
        <AuthenticatedRoute>
            <Head>
                <title>Sales-App</title>
            </Head>
            <div className="h-screen">
                <Layout title="Dashboard">
                    <Dashboard
                        customers={props.dashboard.customers}
                        products={props.dashboard.products}
                        sales={props.dashboard.sales}
                        salesByMonth={props.dashboard.salesByMonth}
                    />
                </Layout>
            </div>
        </AuthenticatedRoute>
    );
};

export async function getStaticProps(context: any) {
    const dashboard: DashboardData = await getDashboardData();
    return {
        props: {
            dashboard,
        },
        revalidate: 10,
    };
}

export default Home;
