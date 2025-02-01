import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
                <ToastContainer />
            </SessionProvider>
        </>
    );
}
