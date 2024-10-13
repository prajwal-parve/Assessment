import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

// Import components
import { AppComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/app.component';
import { NetworkerrorComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/others/networkerror/networkerror.component';
import { NotfoundComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/others/notfound/notfound.component';
import { TodoformComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todoform/todoform.component';
import { TodoitemsComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todoitems/todoitems.component';
import { TodolistComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todolist/todolist.component';
import { LoginComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/user/login/login.component';
import { SignupComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/user/signup/signup.component';

@NgModule({
    
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FilterPipeModule,
        NgxPaginationModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-center',
            closeButton: true,
            progressBar: false,
            preventDuplicates: true
        }),
        AppComponent,
        NetworkerrorComponent,
        NotfoundComponent,
        TodoformComponent,
        TodoitemsComponent,
        TodolistComponent,
        LoginComponent,
        SignupComponent
    ],
    providers: [
        provideHttpClient(withFetch()), // Using fetch API
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
})
export class AppModule { }
