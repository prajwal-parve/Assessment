import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';  
import { AppComponent } from './app.component';

import { AuthService } from './auth.service'; 


@NgModule({
  imports: [
    AppModule, 
    ServerModule, 
    AppComponent
  ],
  providers: [
    AuthService, 
  ],
})
export class AppServerModule {}
