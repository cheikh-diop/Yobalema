import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import 'rxjs/add/operator/map'
import { DataTableResource } from '../data-table';
import { DataTableParams } from '../data-table';

import * as _ from 'underscore'
@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {
  constructor(private http: Http) { }

  private adverts: any[];
  items = [];
  itemCount = 0;
  // paged items 
  pagedItems: any[];
  itemResource =new DataTableResource([]); 

  ngOnInit() {
    // get data
    this.http.get('http://localhost:3000/advert')
      .map((response: Response) => response.json())
      .subscribe(data => {
        this.itemResource = new DataTableResource(data);
        console.log(this.itemResource);

      });

      this.itemResource.count().then(count => this.itemCount = count);
  }

reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
}

// special properties:
rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
}

rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
}
query(params: DataTableParams) {
  return this.http.get('http://localhost:3000/advert').toPromise()
      .then((resp: Response) => ({
          items: resp.json(),
          count: Number(resp.headers.get('X-Total-Count'))
      }));
}
rowTooltip(item) { return item.jobTitle; }


}
