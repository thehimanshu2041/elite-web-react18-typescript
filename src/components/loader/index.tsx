import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <Player
                className="player"
                src={process.env.PUBLIC_URL + '/static/lottie/loader.json'}
                autoplay
                loop
                speed={2}
                style={{ height: '150px', width: '150px' }}
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            />
        </div>
    );
};

export default Loader;
