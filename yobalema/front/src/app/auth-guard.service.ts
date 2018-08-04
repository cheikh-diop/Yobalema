import { Injectable } from '@angular/core';
import {Router,CanActivate  } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth : LoginComponent,private router:Router) { }
canActivate(){
  if (this.auth.loggedIn()){
    return true;
  }
  else {
    this.router.navigate(['/home']);
    return false ;
  }
}

}

