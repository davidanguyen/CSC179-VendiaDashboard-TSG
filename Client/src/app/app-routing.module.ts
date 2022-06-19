import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  /* EXAMPLE PATH FOR OTHERS
  {
    path: '<ShortName>',
    component: <ComponentName>,
    data: {
      breadcrumb: {
        label: '',
        info: '<IconName>'
      }
  } */

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Dynamically build out breadcrumbs w links
  {
    path: ':userId',
    children: [

      // HOME
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        data: {
          breadcrumb: {
            label: 'Home',
            info: 'home'
          }
        }
      },

      // DASHBOARD
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        data: {
          breadcrumb: {
            label: 'Dashboard',
            info: 'dashboard'
          }
        }
      },

      // ABOUT US
      {
        path: 'aboutus',
        pathMatch: 'full',
        component: AboutusComponent,
        data: {
          breadcrumb: {
            label: 'About Us',
            info: 'diversity_1'
          }
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
