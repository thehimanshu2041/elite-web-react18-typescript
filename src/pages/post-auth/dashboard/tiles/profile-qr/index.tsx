import React, { useEffect, useState } from 'react';
import userStore from '../../../../../stores/user';

const ProfileQR: React.FC = () => {

    const { getUserDetailsQR } = userStore;
    const [qrCode, setQrCode] = useState<string | null>(null);

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        getUserDetailsQR().then(data => {
            const qrCodeUrl = URL.createObjectURL(data);
            setQrCode(qrCodeUrl);
        });
    };

    return (
        <>
            {qrCode && (
                <img src={qrCode} alt="QR Code" className="p-2" />
            )}
        </>
    );
};

export default ProfileQR;