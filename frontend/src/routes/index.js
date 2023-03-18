import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
    const token = localStorage.getItem("jwt");
    return useRoutes([
        AuthenticationRoutes(token), 
        MainRoutes(token), 
    ]);
}
