import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search-advert',
  templateUrl: './search-advert.component.html',
  styleUrls: ['./search-advert.component.css']
})

export class SearchAdvertComponent implements OnInit {
  advert  : any;
  status=false;
  type='';
  mark='';
  model='';
  mymodel='';
  country='';
  city='';

 // search="model12333";
 
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    //this.search=route.snapshot.params['search'];
  }

  searchAdvert() {
    let params = new HttpParams()
    .set('type', this.type)
    .set('model', this.model)
    .set('mark', this.mark)
    .set('country', this.country)
    .set('city', this.city);
    this.http.get('advert/searchField',{ params: params }).subscribe(data => {
      this.advert =  data;
    });
  }
  myMethod(value:string){
  console.log(value);

  
 
   // let headers: Headers = new Headers();
   // headers.append('search', 'model1');
  
  let params = new HttpParams().set('search', value);

   this.http.get('advert/search', { params: params }).subscribe(data => {
   this.advert =  data;
  });
  }
  ngOnInit() {
  /*  this.http.get('/advert/search').subscribe(data => {
      this.adverts = data;
    });
    alert( this.adverts);*/
  }
}
