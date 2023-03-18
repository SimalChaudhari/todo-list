// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: true
        },
    ]
};

export default dashboard;
