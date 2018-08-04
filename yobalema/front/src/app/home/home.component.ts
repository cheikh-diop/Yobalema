import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'ngx-flash-messages/lib-dist/flash-messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
  }

  onLostClick(){
    this.router.navigate(['/login']);
    this.flashMsg.show("Vous etes deconnecte maintenant", {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });

  }
  onFoundClick(){
    this.router.navigate(['/createAdvert']);
    this.flashMsg.show("Vous etes deconnecte maintenant", {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });

  }
}
