import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Http, Headers } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';
import { FlashMessagesService } from 'ngx-flash-messages';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authToken: any;
  user1 =
    {
      email: "",
      password: ""
    };



  user =
    {

      id:"",
      name: "",
      last_name: "",
      email: "",
      password: "",
      advert : [],
      address: {
        city: "",
        city_code: "",
        street: "",
        country: ""


      }
    };

  constructor(private router: Router, private http: Http, private flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }


  logIn() {

    if (this.validateRegister(this.user1)) {

      this.http.post('http://localhost:3000/user/authenticate', this.user1)
        .map(res => res.json())
        .subscribe(data => {
          if (data.success) {
            this.storeUserData(data.token, data.user);
            this.flashMessage.show("Bonjour  " + data.user.id + " vous etes maintenant connecte ", {
              classes: ['alert', 'alert-success'], // You can pass as many classes as you need
              timeout: 3000, // Default is 3000
            });
            this.router.navigate(['dashboard']);

          } else {
            this.flashMessage.show(data.msg, {
              classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
              timeout: 1000, // Default is 3000
            });
          }


        }, (err) => {

          console.log(err);

        }
        );
    }
    else {
      this.flashMessage.show('Veuillez saisir une adresse mail et mot de passe', {
        classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
        timeout: 1000, // Default is 3000
      });
    }

  }

  createUser() {

    this.http.post('http://localhost:3000/user/register', this.user)
      .map(res => res.json())
      .subscribe(data => {

        this.flashMessage.show("Vous pouvez vous connectez maintenant", {
          classes: ['alert', 'alert-info'], // You can pass as many classes as you need
          timeout: 5000, // Default is 3000
        });


      }, (err) => {

        console.log(err);
      }
      );


  }
  validateRegister(user: any) {

    if (user.email == "" || user.password == "") {

      return false;
    } else {
      return true;
    }
  }

  storeUserData(token, user) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    
    this.user = user;

  }

  logOut() {

    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }
  getProfile() {
    let headers = new Headers();
    //console.log("la valeur du token avant le load"+this.authToken);
    this.loadToken();
    //console.log("la valeur du token "+this.authToken);
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/profile', { headers: headers })
      .map(res => res.json());
      
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  

  loggedIn(){

    return tokenNotExpired('id_token');

  }




}