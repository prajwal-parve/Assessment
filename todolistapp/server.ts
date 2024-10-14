import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express'; 
import { Request, Response, NextFunction } from 'express'; 
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  // Set the view engine to HTML
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from the /dist/browser folder
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
  }));

  // Use SSR to render the Angular app for all routes
  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // Handle 404 errors
  server.use((req: Request, res: Response) => {
    res.status(404).send('Page Not Found');
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start the Express server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
