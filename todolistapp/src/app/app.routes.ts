import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/user/login/login.component'; 
import { SignupComponent } from 'src/app/components/user/signup/signup.component'; 
import { TodolistComponent } from 'src/app/components/todo/todolist/todolist.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent }, 
  { path: 'todo', component: TodolistComponent }, 
  { path: '**', redirectTo: '/login' } 
];
