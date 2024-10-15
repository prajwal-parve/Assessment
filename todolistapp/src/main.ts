import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if needed
import { RouterModule } from '@angular/router'; // Import RouterModule if using routing

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    // Add any global providers here
  ]
})
  .catch((err) => console.error(err));
