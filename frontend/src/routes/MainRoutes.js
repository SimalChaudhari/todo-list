import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Todo = Loadable(lazy(() => import('views/todo')));

const MainRoutes = (isLoggedIn) => ({
    path: '/',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/todo',
            element: <Todo />
        },
    ]
});

export default MainRoutes;
