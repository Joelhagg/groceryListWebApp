import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lists', component : ListsComponent, canActivate: [AuthGuard]},
    { path: 'lists/:id', component : ListsComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
