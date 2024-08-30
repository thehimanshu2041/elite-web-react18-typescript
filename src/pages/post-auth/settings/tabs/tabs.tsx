import React from 'react';

interface MenuProps {
    selected: string;
    setSelected: (value: string) => void;
}

interface ItemProps {
    value: string;
    selected: string;
    setSelected: (value: string) => void;
}

const SettingTabs: React.FC<MenuProps> = ({ selected, setSelected }) => {
    const menu = [
        {
            label: 'Profile',
            to: '/settings/tabs/profile'
        }, {
            label: 'Change Password',
            to: '/settings/tabs/change-password'
        }, {
            label: 'Setting',
            to: '/settings/tabs/setting'
        }, {
            label: 'Bank Account',
            to: '/settings/tabs/bank'
        }
    ];

    return (
        <div className="flex gap-8 border-b-[1px] border-b-[#eee] bg-white pb-0 p-5 rounded">
            {menu.map((x, i) => (
                <Item
                    value={x.label}
                    key={i}
                    selected={selected}
                    setSelected={setSelected}
                />

            ))}
        </div>
    );
};

const Item: React.FC<ItemProps> = ({ value, selected, setSelected }) => {
    return (
        <button
            onClick={() => setSelected(value)}
            className={`${selected === value
                ? 'border-b-2 border-b-blue text-blue'
                : 'border-b-2 border-b-[rgba(0,0,0,0)]'
                } pb-5`}
        >
            {value}
        </button>
    );
};

export default SettingTabs;
