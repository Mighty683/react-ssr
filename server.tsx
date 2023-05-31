import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { pagesMap } from './src/config/pagesMap';
import { PassThrough } from 'stream'
import {glob} from 'glob';
import {readFile} from 'fs/promises'
import path from 'node:path';

const __dirname = path.dirname(import.meta.url.replace('file://', ''));
async function start() {
  console.log('Starting server...');
  const expressApp = express();

  const staticFiles = await glob(path.resolve(__dirname, '../client/**/*.*'));
  const rootHTML = await readFile(path.resolve(__dirname, '../client/index.html'), 'utf-8')
  for (const file of staticFiles) {
    const path = file.replace(/^.*\/dist\/client/, '');
    console.log(path);
    expressApp.use(path, async (_, res) => {
      console.log(path);
      if (file.endsWith('.js')){
        res.header('Content-Type', 'application/javascript');
      }
      res.write(await readFile(file));
      res.status(200);
      res.send();
    });
  }

  expressApp.use('*', async (req, res) => {
    try {
    const pageConfig = pagesMap.find(({ path }) => path === req.path);
    if (pageConfig) {
      const stream = renderToPipeableStream(pageConfig.component());
      const sink = new PassThrough();
      const connectedStream = stream.pipe(sink);
      const chunks: unknown[] = [];
      for await (const chunk of connectedStream) {
        chunks.push(chunk);
      }
      const appHTML = chunks.join('');
      res.write(rootHTML.replace('<!-- ::APP:: -->', appHTML))
      res.status(200);
      res.send();
    } else {
      res.status(404).send('Not found');
    }
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal server error');
    }
  });
  expressApp.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}
start();