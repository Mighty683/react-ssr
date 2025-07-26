import Express from 'express';
import { readFile } from 'fs/promises';
import { renderMicrofrontend } from './entry-server';


export const app = Express();

// Serve static files first
app.use('/dist', Express.static('dist'));
app.use('/node_modules', Express.static('node_modules/systemjs/dist'));

// Handle all other requests
app.use('/', async (req, res) => {
  try {
    const indexHtmlFile = await readFile('./index.html', 'utf-8');
    
    res.type('html').send(indexHtmlFile.replace('<!-- ::APP:: -->', await renderMicrofrontend()));
  } catch (err) {
    res.status(500).send('Error loading index.html');
  }
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
