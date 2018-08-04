import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { Http, RequestOptions, Headers, URLSearchParams, ResponseContentType, Response } from '@angular/http';
import { Body } from '@angular/http/src/body';
@Component({
  selector: 'app-myadvert',
  templateUrl: './myadvert.component.html',
  styleUrls: ['./myadvert.component.css']
})
export class MyadvertComponent implements OnInit {
  advert: any;
  user = {
    _id: "",
    idadvert: ""
  }
  fixedAdvert: any;
  advert1 = {

    _id:"",
    userid:"",
    title: "",
    description: "",
    mark: "",
    model: "",
    

  }
  matchadvert: any;
  match = false;

  constructor(private router: Router, private http: Http, private auth: LoginComponent) { }

  ngOnInit() {

    this.auth.getProfile().subscribe(profile => {
      this.user._id = profile.user._id;

      console.log(this.user._id)
      this.http.get('http://localhost:3000/user/getUserAdvert/' + this.user._id).subscribe(data => {
        this.advert = data.json().advert;
      });
    },
      err => {
        console.log(err);
        return false;
      }
    )
  }

  fixUpdateAdvert(id) {

    this.fixedAdvert = id
  }

  updateAdvert(){
    this.advert1.userid=this.user._id;
    this.advert1._id=this.fixedAdvert;
    
    this.http.put('http://localhost:3000/user/updateUserAdvert', this.advert1)
    .subscribe(res => {
      
      this.ngOnInit() ;
      
    }, (err) => {
      console.log(err);
    }
    );
  }

  deleteAdvert(id) {
    alert("suppression");
     this.user._id=id;
     this.http.put('http://localhost:3000/user/deleteUserAdvert',this.user)
       .subscribe(res => {
       // console.log(res);
      this.ngOnInit() ;
       }, (err) => {
         console.log(err);
       }
     
       );
     //  this.router.navigate(['/myadvert']);
      // this.router.navigate(['/myadvert']);
   }
  matchAdvert(ad) {
    // une autre annonce regarde 

    console.log("parameter" + ad.type);
    this.http.post('http://localhost:3000/advert/match', ad)
      .map(res => res.json()).
      subscribe(data => {
        console.log("taille " + data.length);
        this.matchadvert = data;
      });
  }

}
