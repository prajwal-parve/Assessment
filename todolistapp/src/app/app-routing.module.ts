import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/others/notfound/notfound.component';
import { TodolistComponent } from './components/todo/todolist/todolist.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { NetworkerrorComponent } from './components/others/networkerror/networkerror.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

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
