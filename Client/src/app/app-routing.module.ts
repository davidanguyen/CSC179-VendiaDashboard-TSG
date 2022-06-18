import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  /* EXAMPLE PATH
  {
    path: '',
    component: HomeComponent
  } */

  {
    path: '',
    component: HomeComponent // set this to "home" later, testing dashboard only
  },

  {
    path: 'dashboard', // set this to 'dashboard' later. Testing dashboard only.
    component: DashboardComponent
  },
  {
    path: 'aboutus', // set this to 'dashboard' later. Testing dashboard only.
    component: AboutusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
