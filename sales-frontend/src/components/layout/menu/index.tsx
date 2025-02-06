import { useUser } from "@/context/UserContext";
import { BarChart, Home, LogOut, Package, ShoppingCart, User, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { JSX } from "react";

interface SidebarProps {
    isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { userImage, userName, userEmail } = useUser();
    console.log(userImage);

    return (
        <aside
            className={`w-60 bg-zinc-950 text-white p-6 transition-transform duration-300 transform fixed top-0 left-0 h-full z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0`}
        >
            {/* Seção do usuário */}
            <div className="flex flex-col items-center mb-4 ">
                {userImage ? (
                    <img
                        src={userImage}
                        alt={`userImage`}
                        className="w-12 h-12 rounded-full border-2 border-zinc-700"
                    />
                ) : (
                    <User className="w-12 h-12 text-zinc-500" />
                )}
                {userName && <span className="text-sm font-medium text-zinc-200 mt-2">{userName}</span>}
                {userEmail && <span className="text-xs text-zinc-400">{userEmail}</span>}
            </div>

            <p className="font-semibold text-3xl text-center text-zinc-200 mb-4">
                My <br /> Sales
            </p>

            {/* Itens do menu */}
            <nav className="space-y-5 mt-6 pt-6 border-t border-zinc-700 pl-7 p-3 flex flex-col">
                <MenuItem href="/" label="Home" icon={<Home />} />
                <MenuItem href="/list/products" label="Products" icon={<Package />} />
                <MenuItem href="/list/customers" label="Customers" icon={<Users />} />
                <MenuItem href="/sales/new-sale" label="Sales" icon={<ShoppingCart />} />
                <MenuItem href="/sales/report-sales" label="Report" icon={<BarChart />} />
                <MenuItem onClick={() => signOut()} label="Logout" icon={<LogOut />} />
            </nav>
        </aside>
    );
};

interface MenuItemsProps {
    href?: string;
    label?: string;
    onClick?: () => void;
    icon?: JSX.Element;
    image?: string;
    name?: string;
}

const MenuItem: React.FC<MenuItemsProps> = ({ href, label, onClick, icon, image, name }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 text-lg text-zinc-400 hover:text-zinc-100 transition-all"
        >
            {image && <img src={image} alt={name} className="w-10 h-10 rounded-full" />}
            {icon} {label} {name && <span className="text-sm">{name}</span>}
        </a>
    );
};
