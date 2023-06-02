import express from 'express';
import Express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'stream'
import {glob} from 'glob';
import {readFile} from 'fs/promises'
import path from 'node:path';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { serverRoutes } from './src/navigation/serverRouter';
import { isPage } from './src/utils/helpers';
import { staticHandler } from './src/navigation/serverHandler';

async function start() {
  console.log('Starting server...');
  const expressApp = express();

  
  await registerStaticFilesHandler(expressApp);
  await registerRootHandler(expressApp);
  startExpressApp(expressApp);
}

start();

const __dirname = path.dirname(import.meta.url.replace('file://', ''));

async function registerStaticFilesHandler(expressApp: Express.Application) {
  const staticFiles = await glob(path.resolve(__dirname, '../client/**/*.*'));
  for (const file of staticFiles) {
    const path = file.replace(/^.*\/dist\/client/, '');
    console.log(`Static file path registered: ${path}`);
    expressApp.use(path, async (_, res) => {
      if (file.endsWith('.js')){
        res.header('Content-Type', 'application/javascript');
      }
      res.write(await readFile(file));
      res.status(200);
      res.send();
    });
  }
}

async function registerRootHandler(expressApp: Express.Application) {
  const rootHTML = await readFile(path.resolve(__dirname, '../client/index.html'), 'utf-8');
  expressApp.use('*', getRootHandler(rootHTML));
}

async function reactRenderHTML(req: Express.Request) {
  const context = await staticHandler.query(new Request(new URL(req.originalUrl, `${req.protocol}://${req.hostname}`)));
  if (context instanceof Response) {
    throw context;
  }
  const router = createStaticRouter(
    staticHandler.dataRoutes,
    context
  );

  const stream = renderToPipeableStream(
    <StaticRouterProvider context={context} router={router} />
  );
  for (const match of context.matches) {
    const routeConfig = serverRoutes.find(route => route.path === match.route.path)
    if (routeConfig) {
      const routeComponent = await routeConfig.getComponent();
      if (routeComponent && isPage(routeComponent) && routeComponent.getServerSideData) {
        await routeComponent.getServerSideData(req)
      }
    }
  }
  const sink = new PassThrough();
  const connectedStream = stream.pipe(sink);
  const chunks: unknown[] = [];
  for await (const chunk of connectedStream) {
    chunks.push(chunk);
  }
  const appHTML = chunks.join('');

  return appHTML;
}

function getRootHandler(rootHTML: string) {
  return async (req: Express.Request, res: Express.Response) => {
    try {
      console.log(`Request in root handler: ${req.originalUrl}`);
      if (req.header('Accept')?.includes('text/html')) {
        res.write(rootHTML.replace('<!-- ::APP:: -->', await reactRenderHTML(req)))
        res.status(200);
        res.send();
      } else {
        res.status(404);
        res.send();
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal server error');
    }
  }
}

function startExpressApp(expressApp: Express.Application) {
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
