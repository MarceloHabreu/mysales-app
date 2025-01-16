import { ReactNode } from "react";
import { Sidebar } from "./menu";

interface LayoutProps {
    title?: string;
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">
                    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 overflow-auto">
                        <div className="md-flex mb-6 border-b border-gray-200 pb-4">
                            <h2 className="uppercase tracking-wide text-3xl text-gray-800 font-bold">{props.title}</h2>
                        </div>
                        <div className="mt-6">
                            <div>{props.children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
