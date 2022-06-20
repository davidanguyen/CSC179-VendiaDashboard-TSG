import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = "Dashboard";
  icon: string = "dashboard";
  username: string = "Name"; //pass it in from header user
  lastLoginTime: string = "< time >";
  lastIPAddress: string = "< location >";
  randomQuote: string = "“Java is to JavaScript what Car is to Carpet.” – Chris Heilmann";
  emplName: string = "Zeus Josh";
  emplCreated: string = "June 19, 2022";

  constructor() { }

  ngOnInit(): void {
  }

}
