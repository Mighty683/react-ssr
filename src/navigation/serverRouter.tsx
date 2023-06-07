import { Page, RouteObjectServer } from '../utils/types';

const routes = import.meta.glob('../pages/**/*.tsx');


export const serverRoutes: RouteObjectServer[] = Object.keys(routes).map((filePath) => {
  const getPageComponent: () => Promise<Page> = () => routes[filePath]().then((module)  => (module as {
    default: Page;
  }).default);

  return {
    path: mapPathToRoute(filePath),
    getComponent: getPageComponent,
  }
})

export function mapPathToRoute(path: string) {
  let targetPath = path.replace('../pages/', '/');
  targetPath = targetPath.replace('.tsx', '');
  targetPath = targetPath.replace('/index', '');
  targetPath = targetPath.replace(/\[(.*?)\]/g, ':$1');

  if (targetPath === '') {
    targetPath = '/';
  }

  return targetPath;
}