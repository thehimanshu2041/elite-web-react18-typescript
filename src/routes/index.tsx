import NotFound from '../pages/not-found';
import Code from '../pages/post-auth/config/code';
import CodeType from '../pages/post-auth/config/code-type';
import AddEditCodeType from '../pages/post-auth/config/code-type/add-edit';
import AddEditCode from '../pages/post-auth/config/code/add-edit';
import Country from '../pages/post-auth/config/country';
import User from '../pages/post-auth/config/user';
import AddEditUser from '../pages/post-auth/config/user/add-edit';
import Dashboard from '../pages/post-auth/dashboard';

interface Route {
    path: string;
    element: React.ComponentType;
    permissions: string[];
}

const routes: Route[] = [
    {
        path: '/',
        element: Dashboard,
        permissions: ['USER', 'ADMIN']
    },
    {
        path: '/config/user',
        element: User,
        permissions: ['ADMIN']
    },
    {
        path: '/config/user/add-edit',
        element: AddEditUser,
        permissions: ['ADMIN']
    },
    {
        path: '/config/user/add-edit/:id',
        element: AddEditUser,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code-type',
        element: CodeType,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code-type/add-edit',
        element: AddEditCodeType,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code-type/add-edit/:codeTypeId',
        element: AddEditCodeType,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code',
        element: Code,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code/add-edit',
        element: AddEditCode,
        permissions: ['ADMIN']
    },
    {
        path: '/config/code/add-edit/:codeId',
        element: AddEditCode,
        permissions: ['ADMIN']
    },
    {
        path: '/config/country',
        element: Country,
        permissions: ['ADMIN']
    },
    {
        path: '*',
        element: NotFound,
        permissions: ['USER', 'ADMIN']
    }
];

export default routes;
