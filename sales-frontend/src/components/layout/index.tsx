import { ReactNode, useState } from "react";
import { Sidebar } from "./menu";
import { Menu, X } from "lucide-react";

interface LayoutProps {
    title?: string;
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
                <main className="flex-1 p-6 flex justify-center ">
                    <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 overflow-auto">
                        <button
                            className="absolute top-4 left-4 md:hidden z-50 p-2 bg-zinc-950 text-white rounded-md"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <X className="fixed" size={24} /> : <Menu size={24} />}
                        </button>

                        <div className="mb-6 border-b border-gray-200 pb-4 text-center">
                            <h2 className="uppercase tracking-wide text-3xl text-gray-800 font-bold">{props.title}</h2>
                        </div>
                        <div className="mt-6">{props.children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
};
