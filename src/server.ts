import Express from 'express';
import { readFile } from 'fs/promises';
import { renderMicrofrontend } from './entry-server';
import { load } from 'cheerio';


export const app = Express();

// Serve static files first
app.use('/dist', Express.static('dist'));
app.use('/node_modules', Express.static('node_modules/systemjs/dist'));

// Handle all other requests
app.use('/', async (req, res) => {
  try {
    const indexHtmlFile = await readFile('./index.html', 'utf-8');
    const data = { exampleKey: 'exampleValue' };
    const renderedElement = await renderMicrofrontend(data);
    const htmlTree = load(indexHtmlFile);
    htmlTree('micro-frontend').html(renderedElement);
    htmlTree('micro-frontend').attr('data-server', JSON.stringify(data));
    const finalHtml = htmlTree.html();
    res.type('html').send(finalHtml);
  } catch (err) {
    res.status(500).send('Error loading index.html');
  }
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
