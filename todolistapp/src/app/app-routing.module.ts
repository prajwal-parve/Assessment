import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { TodolistComponent } from 'src/app/components/todo/todolist/todolist.component'; 
import { TodoformComponent } from 'src/app/components/todo/todoform/todoform.component'; 
import { TodoitemsComponent } from 'src/app/components/todo/todoitems/todoitems.component'; 
import { NotfoundComponent } from 'src/app/components/others/notfound/notfound.component'; 
import { NetworkerrorComponent } from 'src/app/components/others/networkerror/networkerror.component';
import { AuthGuard } from 'src/app/auth/auth.guard'; 
import { LoginGuard } from 'src/app/auth/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, // Route for login
  { path: 'signup', component: SignupComponent }, // Route for signup
  { path: 'todo', component: TodolistComponent, canActivate: [AuthGuard] }, // Protect Todo List with AuthGuard
  { path: 'todo/new', component: TodoformComponent, canActivate: [AuthGuard] }, // Route for adding new todo
  { path: 'todo/items', component: TodoitemsComponent, canActivate: [AuthGuard] }, // Route for todo items
  { path: 'notfound', component: NotfoundComponent }, // Route for 404 page
  { path: 'network-error', component: NetworkerrorComponent }, // Route for network error page
  { path: '**', redirectTo: '/notfound' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
