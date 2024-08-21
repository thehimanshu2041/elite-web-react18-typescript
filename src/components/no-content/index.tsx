import { Player } from '@lottiefiles/react-lottie-player';

interface NoContentProps {
    message?: string;
}

const NoContent: React.FC<NoContentProps> = ({ message }) => {
    return (
        <div className='mt-3'>
            <Player
                src={process.env.PUBLIC_URL + '/static/lottie/NoContentFound.json'}
                className="player"
                autoplay
                loop
                speed={2}
                style={{ height: '300px', width: '300px' }}
            />
            <div className='flex flex-col items-center'>
                <p className='text-center'> {message || 'No Content Found'}</p>
            </div>
        </div>
    );
}

export default NoContent;
