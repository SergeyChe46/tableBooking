import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPanelComponent } from './components/admin/main-panel/main-panel.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TableItemComponent } from './components/table/table-item/table-item.component';
import { authGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TableItemComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lk', component: MainPanelComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
