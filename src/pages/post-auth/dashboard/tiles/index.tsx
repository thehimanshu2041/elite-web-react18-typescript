import React from 'react';
import STile from './stile';
import { Tile } from '../../../../model/elite';
import Profile from './profile';
import ProfileQR from './profile-qr';
import ProfileSetting from './profile-setting';

const tiles: Tile[] = [
    { id: 1, title: 'Profile', content: <Profile /> },
    { id: 2, title: 'QR', content: <ProfileQR /> },
    { id: 3, title: 'Settings', content: <ProfileSetting /> }
];

const Tiles: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-left">
            {tiles.map((tile) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2" key={tile.id}>
                    <STile
                        key={tile.id}
                        title={tile.title}
                        content={tile.content}
                    />
                </div>
            ))}
        </div>
    );
};

export default Tiles;
