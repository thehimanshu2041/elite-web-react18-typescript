import React from 'react';
import {
  RiTerminalBoxFill,
  RiMacFill,
  RiDashboardFill,
  RiListSettingsFill,
  RiShieldUserFill,
  RiSunFill,
  RiFolderSettingsFill
} from 'react-icons/ri';

interface Icon {
  name: string;
  icon: React.ReactElement;
}

export const icons: Icon[] = [
  { name: 'dashboard', icon: <RiDashboardFill style={{ fontSize: '20px' }} /> },
  { name: 'settings', icon: <RiFolderSettingsFill style={{ fontSize: '20px' }} /> },
  { name: 'setting', icon: <RiListSettingsFill style={{ fontSize: '20px' }} /> },
  { name: 'user', icon: <RiShieldUserFill style={{ fontSize: '20px' }} /> },
  { name: 'code', icon: <RiTerminalBoxFill style={{ fontSize: '20px' }} /> },
  { name: 'code-type', icon: <RiMacFill style={{ fontSize: '20px' }} /> },
  { name: 'country', icon: <RiSunFill style={{ fontSize: '20px' }} /> }
];
