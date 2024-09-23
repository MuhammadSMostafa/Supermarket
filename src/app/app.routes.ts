import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path:'', redirectTo:'register',pathMatch:'full'},
  {path:'register', component:RegisterComponent,title:'Register'},
  {path:'login', component:LoginComponent,title:'Login'},
];
