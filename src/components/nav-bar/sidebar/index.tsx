import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';
import { icons } from '../../../constants/icons';
import { adminMenus, userMenus } from '../../../constants/menus';
import './index.css';


// Define types for props
interface SidebarProps {
    sidebarCollapsed: boolean;
    setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItem {
    name: string;
    url?: string;
    icon?: string;
    children?: MenuItem[];
}

export default function Sidebar({ sidebarCollapsed, setSidebarCollapsed }: SidebarProps) {
    const [collapseShow, setCollapseShow] = useState<string>('hidden');
    const location = useLocation();
    const currentPath = location.pathname;
    const { logout, user } = useAuth();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<boolean>(false);

    const handleItemClick = (index: number, hasChildren: boolean) => {
        if (hasChildren) {
            setExpandedIndex(index === expandedIndex ? null : index);
        } else {
            setExpandedIndex(null);
        }
    };

    const isAdminRoleContained = (jwtRoles: string[]): boolean => {
        return jwtRoles.includes('ADMIN');
    };

    return (
        <div>
            <header className="fixed top-0 right-0 p-2 bg-blue shadow-md w-full z-10 hidden md:block">
                <div className="container mx-auto flex justify-end items-center">
                    <button
                        className='cursor-pointer text-white text-xl hover:bg-transparent px-2'
                    >
                        <i className='fas fa-sign-out-alt' onClick={logout}></i>
                    </button>
                    <Avatar name={user?.username} round={true} size='40' />
                </div>
            </header>
            <nav
                className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-blue flex flex-wrap items-center justify-between relative z-10 py-0 px-0 sidebar-transition
          ${sidebarCollapsed && !hoveredIndex ? 'md:w-20' : 'md:w-64'} `}
                onMouseEnter={() => setHoveredIndex(true)}
                onMouseLeave={() => setHoveredIndex(false)}
            >
                <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
                    <div className='visible md:hidden'>
                        <Link
                            className='md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase  p-4 px-0'
                            to='/'
                        >
                            <img
                                className='h-14 object-contain mx-2'
                                style={{ width: "225px" }}
                                src={process.env.PUBLIC_URL + '/static/icons/logo-text.png'}
                                alt='logo'
                            />
                        </Link>
                    </div>
                    <div className='hidden md:block'>
                        <Link
                            className='md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase  p-4 px-0'
                            to='/'
                        >
                            <img
                                className='h-14 object-contain'
                                style={{ width: "225px" }}
                                src={hoveredIndex ? process.env.PUBLIC_URL + '/static/icons/logo-text.png' : process.env.PUBLIC_URL + '/static/icons/logo.png'}
                                alt='logo'
                            />
                        </Link>
                    </div>
                    <button
                        className='cursor-pointer text-white  md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                        type='button'
                        onClick={() => setCollapseShow('bg-blue m-2 py-3 px-6')}
                    >
                        <i className='fas fa-bars'></i>
                    </button>
                    <div
                        className={
                            `md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`
                        }
                    >
                        <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
                            <div className='flex flex-wrap'>
                                <div className='w-6/12 flex flex-row align-items-center'>
                                    <Avatar name={user?.username} round={true} size='40' />
                                    <p className='text-white ml-1 mt-3'>{user?.username}</p>
                                </div>
                                <div className='w-6/12 flex justify-end'>
                                    <button
                                        className='cursor-pointer text-white text-xl hover:bg-transparent px-2'
                                    >
                                        <i className='fas fa-sign-out-alt' onClick={logout}></i>
                                    </button>
                                    <button
                                        className='cursor-pointer text-white text-xl hover:bg-transparent'
                                        onClick={() => setCollapseShow('hidden')}
                                    >
                                        <i className='fas fa-times'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`${!sidebarCollapsed || hoveredIndex ? '' : 'hidden'} `}>
                            <ul className='md:flex-col md:min-w-full flex flex-col list-none pt-1'>
                                {(isAdminRoleContained(user?.roles ?? []) ? adminMenus : userMenus)?.map((item: MenuItem, index: number) => {
                                    if (item.url) {
                                        if (item.children && item.children.length) {
                                            return (
                                                <li key={index} className='items-center hover:text-white px-3 text-white'>
                                                    <span
                                                        className='text-xs uppercase py-3 flex items-center cursor-pointer'
                                                        onClick={() => handleItemClick(index, (item.children?.length ? item.children?.length > 0 : false))}
                                                    >
                                                        <i className='pr-2 text-xs'>{icons.find((c: any) => c.name === item.icon)?.icon}</i>
                                                        <span>{item.name}</span>
                                                        {item.children && (
                                                            <span className="ml-auto">
                                                                {expandedIndex === index ? <i className='fas fa-chevron-down'></i> : <i className='fas fa-chevron-right'></i>}
                                                            </span>
                                                        )}
                                                    </span>
                                                    <ul className={`md:flex-col md:min-w-full flex flex-col list-none ml-5 w-full child-list ${expandedIndex === index ? 'expanded' : ''}`}>
                                                        {expandedIndex === index && item.children.map((child: MenuItem, childIndex: number) => {
                                                            if (child.url) {
                                                                return (
                                                                    <li key={childIndex} className={`items-center hover:text-white w-full ${currentPath === child.url ? 'text-white underline' : 'text-white'}`}>
                                                                        <Link
                                                                            className='text-xs uppercase py-3 block'
                                                                            to={child.url}
                                                                            onClick={() => setCollapseShow('hidden')}
                                                                        >
                                                                            <span className="flex items-center">
                                                                                <i className='pr-2 text-sm'>{icons.find((c: any) => c.name === child.icon)?.icon}</i>
                                                                                <span>{child.name}</span>
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </ul>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={index} className={`items-center px-3 hover:text-white ${currentPath === item.url ? 'text-white underline' : 'text-white'}`}>
                                                    <Link
                                                        className='text-xs uppercase py-3 block'
                                                        to={item.url}
                                                        onClick={() => {
                                                            handleItemClick(-1, false);
                                                            setCollapseShow('hidden');
                                                        }}
                                                    >
                                                        <span className="flex items-center">
                                                            <i className='pr-2 text-sm'>{icons.find((c: any) => c.name === item.icon)?.icon}</i>
                                                            <span>{item.name}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                        <div className={`${sidebarCollapsed && !hoveredIndex ? '' : 'hidden'} `}>
                            <ul className='md:flex-col md:min-w-full flex flex-col list-none pt-1 items-center'>
                                {(isAdminRoleContained(user?.roles ?? []) ? adminMenus : userMenus)?.map((item: MenuItem, index: number) => {
                                    if (item.url) {
                                        if (item.children) {
                                            return (
                                                <li key={index} className='items-center hover:text-white px-3 text-white'>
                                                    <span
                                                        className='py-3 flex items-center cursor-pointer'
                                                        onClick={() => handleItemClick(index, (item.children?.length ? item.children?.length > 0 : false))}
                                                    >
                                                        {icons.find((c: any) => c.name === item.icon)?.icon}
                                                    </span>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={index} className={`items-center px-3 hover:text-white ${currentPath === item.url ? 'text-white underline' : 'text-white'}`}>
                                                    <Link
                                                        className='uppercase py-3 block'
                                                        to={item.url}
                                                        onClick={() => {
                                                            handleItemClick(-1, false);
                                                            setCollapseShow('hidden');
                                                        }}
                                                    >
                                                        <span className="flex items-center">
                                                            {icons.find((c: any) => c.name === item.icon)?.icon}
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
