import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/others/notfound/notfound.component';
import { TodolistComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todolist/todolist.component';
import { LoginComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/user/login/login.component';
import { SignupComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/user/signup/signup.component';
import { NetworkerrorComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/others/networkerror/networkerror.component';
import { AuthGuard } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/auth/auth.guard';
import { LoginGuard } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/auth/login.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },  
    { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] }, 
    { path: 'todo', component: TodolistComponent, canActivate: [AuthGuard] },  
    { path: 'network-error', component: NetworkerrorComponent },  
    { path: '**', component: NotfoundComponent }  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
