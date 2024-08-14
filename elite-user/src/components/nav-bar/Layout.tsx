import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Container } from '@mui/material';
import useSettings from '../../hooks/useSettings';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [mainContentStyle, setMainContentStyle] = useState('md:ml-68 main-content-transition');

    const { themeStretch } = useSettings();

    useEffect(() => {
        setMainContentStyle(sidebarCollapsed ? 'md:ml-20 main-content-transition' : 'md:ml-64 main-content-transition');
    }, [sidebarCollapsed]);

    return (
        <>
            <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            <div className={`relative md:pt-12 h-full bg-gray-light ${mainContentStyle}`}>
                <div className='w-full'>
                    <main>
                        <Container
                            className='py-3'
                            style={{ minHeight: 'calc(100vh - 80px)' }}
                            maxWidth={themeStretch ? 'lg' : false}
                        >
                            {children}
                        </Container>
                    </main>
                </div>
            </div>
        </>
    );
}


export default Layout;