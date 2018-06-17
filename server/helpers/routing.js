/* @flow */
import fs from 'fs';

import {
  getPath,
  isAJavascriptFile,
  isNotIndex,
  isNotTest,
  withoutExtension,
} from '@/fs';

export const isARouteFile = (file: string) =>
  isAJavascriptFile(file) && isNotIndex(file) && isNotTest(file);

export const makeRouterInjector = (router: any) => (file: string) => {
  const routeBaseName = withoutExtension(file);
  const routeBasePath = `/${routeBaseName}`;

  const { default: subRouter } = require(file); // eslint-disable-line

  router
    .use(
      routeBasePath,
      subRouter.routes(),
      subRouter.allowedMethods(),
    );
};

export const useRoutersFromDirectory = (directory: string, router: any) => {
  const injectIntoRouter = makeRouterInjector(router);
  const getFilePath = getPath(directory);

  fs
    .readdirSync(directory)
    .map(getFilePath)
    .filter(isARouteFile)
    .forEach(injectIntoRouter);
};
