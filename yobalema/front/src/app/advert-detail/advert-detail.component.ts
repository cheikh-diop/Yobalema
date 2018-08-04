import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.css']
})
export class AdvertDetailComponent implements OnInit {

  advert = {};
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient,  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone)  { }
  
  getAdvertDetail(id) {
      this.http.get('http://localhost:3000/advert/'+id).subscribe(data => {
        this.advert = data;
      });
    }
    ngOnInit() {
      this.getAdvertDetail(this.route.snapshot.params['id']);
  //set google maps defaults
  this.zoom = 15;
  //this.latitude = 39.8282;
  //this.longitude = -98.5795;

  

}
}