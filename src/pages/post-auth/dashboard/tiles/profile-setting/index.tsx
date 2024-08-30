import React, { useEffect, useState } from 'react';
import userStore from '../../../../../stores/user';
import { RiFileCopy2Fill } from 'react-icons/ri';
import snackbarUtils from '../../../../../utils/snackbar';
import { UserSettingModel } from '../../../../../model/user';

const ProfileSetting: React.FC = () => {

    const { getUserSettings } = userStore;
    const [userSetting, setUserSetting] = useState<UserSettingModel | null>(null);

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        getUserSettings().then(data => {
            setUserSetting(data);
        });
    };

    const copySecret = async () => {
        navigator.clipboard.writeText(userSetting?.secret!);
        snackbarUtils.success('Secret has been successfully copied!!!');
    };

    const copyToken = async () => {
        navigator.clipboard.writeText(userSetting?.token!);
        snackbarUtils.success('Token has been successfully copied!!!');
    };

    return (
        <>
            {userSetting && <div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Uid :</span>
                    <span className="text-gray-900 text-sm">{userSetting.uid}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Secret :</span>
                    <span className="text-gray-900 text-sm"><RiFileCopy2Fill className='cursor-pointer' onClick={copySecret} /></span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Token :</span>
                    <span className="text-gray-900 text-sm"><RiFileCopy2Fill className='cursor-pointer' onClick={copyToken} /></span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Notification :</span>
                    <span className="text-gray-900 text-sm">
                        <input
                            type="checkbox"
                            name="notification"
                            checked={userSetting.notification === true}
                            readOnly
                        />
                    </span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Email :</span>
                    <span className="text-gray-900 text-sm">
                        <input
                            type="checkbox"
                            name="notification"
                            checked={userSetting.email === true}
                            readOnly
                        />
                    </span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Night Mode :</span>
                    <span className="text-gray-900 text-sm">
                        <input
                            type="checkbox"
                            name="notification"
                            checked={userSetting.night_mode === true}
                            readOnly
                        />
                    </span>
                </div>
            </div>}
        </>
    );
};

export default ProfileSetting;