import React from 'react';
import { FaLock } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdManageAccounts } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';

// Define the type for the icon objects
interface Icon {
  name: string;
  icon: React.ReactElement;
}

// Create the icons array with the defined type
export const icons: Icon[] = [
  { name: 'dashboard', icon: <RiDashboardFill style={{ fontSize: '20px' }} /> },
  { name: 'security', icon: <FaLock style={{ fontSize: '20px' }} /> },
  { name: 'setting', icon: <MdManageAccounts style={{ fontSize: '20px' }} /> },
  { name: 'features', icon: <GiReceiveMoney style={{ fontSize: '20px' }} /> },
];
