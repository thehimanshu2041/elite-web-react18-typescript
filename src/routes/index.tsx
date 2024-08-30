import Login from '../pages/auth/login';
import Registration from '../pages/auth/register';
import NotFound from '../pages/not-found';

interface Route {
    path: string;
    element: React.ComponentType;
    permissions: string[];
}

const routes: Route[] = [
    {
        path: '/',
        element: Login,
        permissions: []
    },
    {
        path: '/login',
        element: Login,
        permissions: []
    },
    {
        path: '/registration',
        element: Registration,
        permissions: []
    },
    {
        path: '*',
        element: NotFound,
        permissions: []
    }
];

export default routes;
