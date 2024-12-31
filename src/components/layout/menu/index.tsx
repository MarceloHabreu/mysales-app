import Link from "next/link";
export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile ">
            <p className="menu-label is-hidden-touch">My Sales</p>
            <ul className="menu-list">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/" label="Add Product" />
                <MenuItem href="/" label="Config" />
                <MenuItem href="/" label="Logout" />
            </ul>
        </aside>
    );
};

interface MenuItemsProps {
    href: string;
    label: string;
}

const MenuItem: React.FC<MenuItemsProps> = (props: MenuItemsProps) => {
    return (
        <li>
            <Link href={props.href}>
                <span className="icon"></span> {props.label}
            </Link>
        </li>
    );
};
