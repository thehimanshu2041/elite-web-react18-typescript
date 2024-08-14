import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface EliteLottiePlayerProps {
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    speed?: number;
    height?: string;
    width?: string;
    className?: string;
}

const EliteLottiePlayer: React.FC<EliteLottiePlayerProps> = ({
    src,
    autoplay = true,
    loop = true,
    speed = 1,
    height = '550px',
    width = '550px',
    className = '',
}) => {
    return (
        <Player
            src={src}
            className={`player ${className}`}
            autoplay={autoplay}
            loop={loop}
            speed={speed}
            style={{ height, width }}
        />
    );
};

export default EliteLottiePlayer;
