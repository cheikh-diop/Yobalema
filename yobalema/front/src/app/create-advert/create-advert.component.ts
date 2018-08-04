import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { Http, RequestOptions, Headers, URLSearchParams, ResponseContentType, Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';
import { } from 'googlemaps';
import { AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-advert',
  templateUrl: './create-advert.component.html',
  styleUrls: ['./create-advert.component.css']
})

export class CreateAdvertComponent implements OnInit {

  advert = {
    title : "",
    type :"",
    description:"",
    mark:"",
    model:"",
    image_url:"",
    date_time:"",
    address: {
      street: "",
      city: "",
      code_city: "",
      country: "",
      longitude:"",
      latitude:""
  }

  }
  url = '';
  image_path = '';
  user = {
    id: "",
    name: "",
    last_name: "",
    email: "",
    password: "",
    advert: {},
    address: {
      city: "",
      city_code: "",
      street: "",
      country: "",
      
    }
  }
  place;
  myGroup1: FormGroup;
  titleControl: FormControl;

  myGroup2: FormGroup;
  markControl: FormControl;

  myGroup3: FormGroup;
  modelControl: FormControl;

  //myGroup4: FormGroup;
  //selectControl: FormControl;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private router: Router, private http: HttpClient, private auth: LoginComponent, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.titleControl = new FormControl('', Validators.required);
    this.markControl = new FormControl('', Validators.required);
    this.modelControl = new FormControl('', Validators.required);
   // this.selectControl = new FormControl('', Validators.required);

    this.myGroup1 = new FormGroup({
      titleControl: this.titleControl
    });
    this.myGroup2 = new FormGroup({
      markControl: this.markControl
    });
    this.myGroup3 = new FormGroup({
      modelControl: this.modelControl
    });
   /* this.myGroup4 = new FormGroup({
      selectControl: this.selectControl
    });*/
  }

  createAdvert() {
    // Si il n y a pas de connexion cela veut dire c'est un ajout d'objet trouve
    console.log("creer annonce");
    console.log("pub" +JSON.stringify(this.advert))
    this.http.post('http://localhost:3000/advert/addAdvertLessUser', this.advert)
      .subscribe(res => {
        alert("Votre annonce a été créé avec succés");
        console.log("RESULTAT" + res);
      }, (err) => {
        console.log(err);
      }
      );
      alert("Votre annonce a été créé avec succés");
      this.router.navigate(['myadvert']);
    }


    readUrl(event: any) {

      if (event.target.files && event.target.files[0]) {

        var reader = new FileReader();

        var tmppath = URL.createObjectURL(event.target.files[0]);
        Object.assign(this.advert, {
          "image_url": event.target.files[0].name
        });
        reader.onload = (event: any) => {
          this.url = event.target.result;
          Object.assign(this.advert, {
            "url": this.url
          });

        }
        reader.readAsDataURL(event.target.files[0]);
      } 
    }

    userCreateAdvert() {

    this.user.advert = this.advert;

    console.log("annonce " + JSON.stringify(this.user));
    this.http.put('http://localhost:3000/user/addUserAdvert', this.user)
      .subscribe(res => {
        alert("Votre annonce a été créé avec succés");
        
        
      }, (err) => {

        console.log(err);
      }
      )
      alert("Votre annonce a été créé avec succés");
      
      this.router.navigate(['myadvert']);
    }

    ngOnInit() {
      // Recuperation de l'utilisateur
      if (localStorage.getItem('user')) {
        this.auth.getProfile().subscribe(profile => {
          this.user = profile.user;

        },
          err => {
            console.log(err);
            return false;
          }
        )
      }

      //set google maps defaults
      this.zoom = 9;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();
      var options = {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' }
      };
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            
            this.advert.address.latitude =  place.geometry.location.lat().toString();
            this.advert.address.longitude =  place.geometry.location.lng().toString();
            this.zoom = 20;
           // alert(this.searchElementRef.nativeElement.value);
            var arrayOfStrings = this.searchElementRef.nativeElement.value.split(',');
            if (arrayOfStrings.length == 3) {
              this.advert.address.country = arrayOfStrings[2];
              this.advert.address.city = arrayOfStrings[1];
              this.advert.address.street = arrayOfStrings[0];
              
            }
            else {
              this.advert.address.country = arrayOfStrings[3];
              this.advert.address.city = arrayOfStrings[2];
              this.advert.address.street = arrayOfStrings[0] + " " + arrayOfStrings[1];
            }
          });
        });
      });

    }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 9;

      });
    }
  }
}