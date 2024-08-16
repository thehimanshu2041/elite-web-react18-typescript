// Define the type for child menu items
interface MenuItemChild {
    name: string;
    key: string;
    url: string;
    icon: string;
    read: boolean;
}

// Define the type for parent menu items
interface MenuItem {
    name: string;
    key: string;
    url: string;
    icon: string;
    read: boolean;
    children?: MenuItemChild[]; // Optional property for nested menu items
}

// Create the menus array with the defined type
export const menus: MenuItem[] = [
    {
        name: 'Dashboard',
        key: "dashboard",
        url: "/",
        icon: "dashboard",
        read: true
    },
    {
        name: 'Security',
        key: "security",
        url: "/security",
        icon: "security",
        read: true
    }
];
