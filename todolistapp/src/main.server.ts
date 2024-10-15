import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { AppServerModule } from 'src/app/app.server.module';
import { REQUEST } from '@nguniversal/express-engine/tokens';

const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist/todolistapp/browser'); // Ensure this path is correct

// Set the view engine to Angular Universal
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req }); // Pass the request object to the render
});

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
