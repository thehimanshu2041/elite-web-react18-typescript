interface MenuItemChild {
    name: string;
    key: string;
    url: string;
    icon: string;
    read: boolean;
}

interface MenuItem {
    name: string;
    key: string;
    url: string;
    icon: string;
    read: boolean;
    children?: MenuItemChild[];
}

export const adminMenus: MenuItem[] = [
    {
        name: "Dashboard",
        key: "dashboard",
        url: "/",
        icon: "dashboard",
        read: true,
    },
    {
        name: "Config",
        key: "config",
        url: "/config",
        icon: "setting",
        read: true,
        children: [
            {
                name: "User",
                key: "user",
                url: "/config/user",
                icon: "user",
                read: true,
            },
            {
                name: "Code",
                key: "code",
                url: "/config/code",
                icon: "code",
                read: true,
            },
            {
                name: "Code Type",
                key: "code-type",
                url: "/config/code-type",
                icon: "code-type",
                read: true,
            },
            {
                name: "Country",
                key: "country",
                url: "/config/country",
                icon: "country",
                read: true,
            }
        ]
    }
];


export const userMenus: MenuItem[] = [
    {
        name: "Dashboard",
        key: "dashboard",
        url: "/",
        icon: "dashboard",
        read: true,
    }
]