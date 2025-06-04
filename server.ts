import 'zone.js/node';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import { provideServerRendering } from '@angular/ssr';
import { render } from './src/main.server';

const app = express();
const distFolder = join(process.cwd(), 'dist/ssr-api-app/browser');
const indexHtml = existsSync(join(distFolder, 'index.html')) ? readFileSync(join(distFolder, 'index.html')).toString() : '';

app.get('/api/data', async (_req: Request, res: Response) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).send('Error');
  }
});

app.get('*.*', express.static(distFolder));

app.get('*', async (req: Request, res: Response) => {
  const html = await render({
    document: indexHtml,
    url: req.originalUrl,
    providers: [provideServerRendering(), { provide: APP_BASE_HREF, useValue: req.baseUrl }]
  });
  res.send(html);
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node server listening on http://localhost:${port}`);
});
