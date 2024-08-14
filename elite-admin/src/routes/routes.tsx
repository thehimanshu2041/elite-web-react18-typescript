import Dashboard from './../pages/post-auth/dashboard/dashboard';
import Security from './../pages/post-auth/security/security';

interface Route {
    path: string;
    element: React.ComponentType;
    permissions: string[];
}

const routes: Route[] = [
    {
        path: '/',
        element: Dashboard,
        permissions: []
    },
    {
        path: '/security',
        element: Security,
        permissions: []
    }
];

export default routes;
