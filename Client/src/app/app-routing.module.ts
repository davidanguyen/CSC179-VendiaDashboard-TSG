import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  /* EXAMPLE PATH
  {
    path: '',
    component: HomeComponent
  } */

  {
    path: '',
    component: DashboardComponent // set this to "home" later, testing dashboard only
  },

  {
    path: 'dashboard', // set this to 'dashboard' later. Testing dashboard only.
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
