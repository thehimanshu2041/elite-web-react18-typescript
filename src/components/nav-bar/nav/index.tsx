import React, { ReactNode } from 'react';
import Layout from '../layout';

interface NavBarProps {
    children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default NavBar;
