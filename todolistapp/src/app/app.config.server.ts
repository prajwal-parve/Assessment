import { mergeApplicationConfig, ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http'; 
import { appConfig } from './app.config';

class ServerErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Server-side error occurred:', error);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(), 
    { provide: ErrorHandler, useClass: ServerErrorHandler } 
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
