import Head from "next/head";
import { Layout } from "components";
const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Sales-App</title>
            </Head>
            <Layout />
        </div>
    );
};

export default Home;
