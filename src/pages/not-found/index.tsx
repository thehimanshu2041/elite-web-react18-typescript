import React from 'react';
import { Link } from 'react-router-dom';
import NoContent from '../../components/no-content';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-3">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg mt-2">Sorry, the page you are looking for does not exist or you are not authorized to access this page.</p>
            <Link
                to="/"
                className="text-xl font-bold mt-3"
            >
                <h2>Go Back to Home</h2>
            </Link>

            <NoContent message='&nbsp;' />
        </div>
    );
};

export default NotFound;
