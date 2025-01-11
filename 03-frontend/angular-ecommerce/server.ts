import { APP_BASE_HREF } from '@angular/common';
// import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideServerRendering, renderApplication, renderModule } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { AppServerModule } from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // All regular routes use the Angular engine
  server.get('*', async (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    try {
      const html = await renderModule(AppServerModule, {
        document: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        extraProviders: [
          { provide: APP_BASE_HREF, useValue: baseUrl }
        ],
      });
      res.send(html);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
