import { useState } from 'react';
import BreadCrumb from '../../../components/breadcrumb';
import SettingTabs from './tabs/tabs';
import Profile from './tabs/profile';
import ChangePassword from './tabs/change-password';
import Setting from './tabs/setting';
import Bank from './tabs/bank';

const Settings: React.FC = () => {
    const [selected, setSelected] = useState('Profile');
    return (
        <>
            <BreadCrumb heading="Settings" />
            <SettingTabs selected={selected} setSelected={setSelected} />
            {selected === 'Profile' && <Profile />}
            {selected === 'Change Password' && <ChangePassword />}
            {selected === 'Setting' && <Setting />}
            {selected === 'Bank Account' && <Bank />}
        </>
    );
}

export default Settings;
