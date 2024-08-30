import React, { useEffect, useState } from 'react';
import userStore from '../../../../../stores/user';
import { UserModel } from '../../../../../model/user';

const Profile: React.FC = () => {

    const { getUserDetails } = userStore;
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        getUserDetails().then(data => {
            setUser(data);
        });
    };

    return (
        <>
            {user && <div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Name :</span>
                    <span className="text-gray-900 text-sm">{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Username :</span>
                    <span className="text-gray-900 text-sm">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Email :</span>
                    <span className="text-gray-900 text-sm">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Address :</span>
                    <span className="text-gray-900 text-sm">{user.address}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Phone :</span>
                    <span className="text-gray-900 text-sm">{`+${user.country?.phoneCode}-${user.phone}`}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700 text-sm">Country :</span>
                    <span className="text-gray-900 text-sm">
                        <div className='flex-row flex'>
                            <span className='mr-2 mt-1'>
                                <img
                                    src={`https://flagcdn.com/16x12/${user.country?.isp?.toLowerCase()}.png`}
                                    alt={`${user.country?.niceName} flag`}
                                    width="20"
                                    height="15"
                                />
                            </span>
                            {user.country?.niceName}
                        </div>
                    </span>
                </div>

            </div>}
        </>
    );
};

export default Profile;