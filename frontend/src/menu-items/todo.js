// assets
import { IconList } from "@tabler/icons";
const icons = { IconList };

const donors = {
  id: 'todo',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Todo',
      type: 'item',
      url: '/todo',
      icon: icons.IconList,
      breadcrumbs: true
    },
  ]
};

export default donors;
