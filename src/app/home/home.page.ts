import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
  }

  ngOnInit(): void {

    console.log('tab1 ngoninit reached ');
  }


}
