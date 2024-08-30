import React from 'react';

interface TileProps {
    title: string;
    content: React.ReactNode;
}

const STile: React.FC<TileProps> = ({ title, content }) => {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-1 p-4 bg-white" style={{ maxHeight: '300px', minHeight: '300px' }}>
                <div className="flex items-center mb-4">
                    <div className="font-bold text-xl">{title}</div>
                </div>
                <div className="text-gray-700 text-base" style={{ maxHeight: 'calc(300px - 120px)', minHeight: 'calc(300px - 120px)' }}>
                    {content}
                </div>
            </div>
        </>
    );
};

export default STile;