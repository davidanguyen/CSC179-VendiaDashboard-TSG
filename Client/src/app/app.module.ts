import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { AddEmplModalComponent } from './modalComponents/add-empl-modal/add-empl-modal.component';
import { EditEmplModalComponent } from './modalComponents/edit-empl-modal/edit-empl-modal.component';
import { OverallShareModalComponent } from './modalComponents/overall-share-modal/overall-share-modal.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BreadcrumbModule } from "xng-breadcrumb";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent,
    AboutusComponent,
    FooterComponent,
    AddEmplModalComponent,
    EditEmplModalComponent,
    OverallShareModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    BreadcrumbModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
