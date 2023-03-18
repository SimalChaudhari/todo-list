import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

const Login = Loadable(lazy(() => import('views/authentication/login/index')));
const ForgotPasswordUI = Loadable(lazy(() => import('views/authentication/login/forget-password')));
const ResetPassword = Loadable(lazy(() => import('views/authentication/login/reset-password')));

const AuthenticationRoutes = (isLoggedIn) => ({
    path: '/',
    element: !isLoggedIn ? <MinimalLayout /> : <Navigate to="/dashboard" /> ,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/forgot-password',
            element: <ForgotPasswordUI />
        },
        {
            path: '/reset-password/:token',
            element: <ResetPassword />
        },  
    ]
});

export default AuthenticationRoutes;
