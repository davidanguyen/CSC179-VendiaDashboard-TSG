import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // Properties
    title: string = "Home Page";
    icon: string = "homepage";
    username: string = "Name"; // pass it in from header user

  constructor() { }

  ngOnInit(): void {

  }

}
