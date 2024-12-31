import { ReactNode } from "react";
import { Menu } from "./menu";

interface LayoutProps {
    title?: string;
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <div className="app">
            <section className="main-content columns is-fullheight">
                <Menu />
                <div className="container column is-10">
                    <div className="section ">
                        <div className="card ">
                            <div className="card-header">
                                <p className="card-header-title">{props.title}</p>
                            </div>
                            <div className="card-content">
                                <div className="content">{props.children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
