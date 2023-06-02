import { RouteObjectServer } from '../utils/types';

export const serverRoutes: RouteObjectServer[] = [
  {
    path: "*",
    getComponent: () => import('../pages/Home').then(module => module.HomePage),
  },
  {
    path: "/user",
    getComponent :() => import('../pages/User').then(module => module.UserPage),
  },
];