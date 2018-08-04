import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { FlashMessagesService } from 'ngx-flash-messages/lib-dist/flash-messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: LoginComponent, private router: Router, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogOutClick() {

    this.auth.logOut();
    
    
    console.log("you clicked on logout");
    this.flashMsg.show("Vous etes deconnecte maintenant", {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });    
    
    this.router.navigate(['/home']);
    return false;
    


  }
}
