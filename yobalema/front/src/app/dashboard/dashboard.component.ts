import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component'
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  constructor(private auth: LoginComponent, private router: Router) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile.user;


    },
      err => {
        console.log(err);
        return false;
      }
    )
  }

}
