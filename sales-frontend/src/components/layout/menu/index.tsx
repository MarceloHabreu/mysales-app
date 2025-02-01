import { signOut } from "next-auth/react";

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-72 bg-zinc-950 p-6 ">
            <p className="font-semibold text-3xl text-center text-zinc-200  mb-4">My Sales</p>
            <nav className="space-y-5 mt-6 pt-6 border-t border-zinc-700 "></nav>

            <nav className="space-y-5 items-center flex flex-col gap-3">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/list/products" label="Products" />
                <MenuItem href="/list/customers" label="Customers" />
                <MenuItem href="/sales/new-sale" label="Sales" />
                <MenuItem href="/sales/report-sales" label="Report" />
                <MenuItem onclick={() => signOut()} href="#" label="Logout" />
            </nav>
        </aside>
    );
};

interface MenuItemsProps {
    href?: string;
    label: string;
    onclick?: () => void;
}
const MenuItem: React.FC<MenuItemsProps> = (props: MenuItemsProps) => {
    return (
        <a href={props.href} onClick={props.onclick} className="flex gap-3 text-2xl text-zinc-400 hover:text-zinc-100">
            <span className="icon"></span> {props.label}
        </a>
    );
};
