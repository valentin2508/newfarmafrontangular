import 'zone.js/node';
import '@angular/compiler';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Importa la función `app()` generada por Angular en el bundle SSR
import { app as angularApp } from './dist/NewFarmaProject/server/main.js';
 //import { app as angularApp } from './dist/NewFarmaProject/server/main.server.mjs';

export function app(): express.Express {
  const server = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const browserDistFolder = join(__dirname, './dist/NewFarmaProject/browser');

  // Archivos estáticos (JS, CSS, imágenes, etc.)
  server.use(express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // SSR: todas las rutas son procesadas por Angular Universal
  server.get('*', angularApp());

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`✅ SSR server listening on https://localhost:${port}`);
  });
}

run();
