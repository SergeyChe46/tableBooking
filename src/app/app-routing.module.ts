import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPanelComponent } from './components/admin/main-panel/main-panel.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lk', component: MainPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
