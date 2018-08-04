import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AdvertComponent } from './advert/advert.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateAdvertComponent } from './create-advert/create-advert.component';
import { Router } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages/';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGuardService} from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { MyadvertComponent } from './myadvert/myadvert.component';
import { SearchAdvertComponent } from './search-advert/search-advert.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {PaginationserviceService} from './paginationservice.service'
import { EqualValidator } from './login/password.match.directive';
import { DataTableModule } from './data-table';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'myadvert',
    component: MyadvertComponent,
    canActivate:[AuthGuardService],    
    data: { title: 'myadvert' }
  },
  {
    path: 'searchAdvert',
    component: SearchAdvertComponent,
    canActivate:[AuthGuardService],    
    data: { title: 'searchadvert' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardService],
    data: { title: 'login' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'home' }
  },
  {
    path: 'myadvert',
    component: MyadvertComponent,
    data: { title: 'home' }
  },
  {
    path: 'adverts',
    component: AdvertComponent,
    canActivate:[AuthGuardService],
    data: { title: 'Advert List' }
  },
  {
    path: 'createAdvert',
    component: CreateAdvertComponent,
    data :{ title : 'create advert '}
  }
  ,
  {
    path: 'advert-detail/:id',
    canActivate:[AuthGuardService],
    component: AdvertDetailComponent
  }
  ,
  
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    CreateAdvertComponent,
    EqualValidator,
    AppComponent,
    AdvertComponent,
    AdvertDetailComponent,
    LoginComponent,
 
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    MyadvertComponent,
    SearchAdvertComponent,
    ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDEo8uS3WIFZ-62Md3Dsm6-4DB8OHc0Jkc",
      libraries: ["places"],
      language: 'fr',
    }),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule, 
    FlashMessagesModule,
    CommonModule,
    HttpModule,
    DataTableModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [LoginComponent,AuthGuardService,PaginationserviceService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
