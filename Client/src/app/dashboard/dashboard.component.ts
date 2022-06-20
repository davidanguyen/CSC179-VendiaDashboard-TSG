import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Properties
  title: string = "Dashboard";
  icon: string = "dashboard";
  username: string = "Name"; // pass it in from header user
  lastLoginTime: string = "< time >";
  lastIPAddress: string = "< location >";
  randomQuote: string = "“Java is to JavaScript what Car is to Carpet.” – Chris Heilmann";

  emplName: string = "Zeus Josh";
  emplCreated: string = "June 19, 2022";

  numEmpl: string = "000";
  numAVG: string = "000";
  numMean: string = "000";
  numSD: string = "000";

  constructor() { }

  ngOnInit(): void {
    // Register all chart controllers
    Chart.register(...registerables);

    // Charts
    const doughnutCTX = 'genderPie';
    const barCTX = 'genderBar';
    const genderData = {
      labels: ['Male', 'Female', 'Transgender', 'Non-Binary/Non-Conforming', 'Prefer not to respond'],
      datasets: [{
        label: 'Genders',
        data: [1, 2, 3, 4, 5], //insert data from server here
        backgroundColor: [
          'rgb(54, 162, 235)',    // Male
          'rgb(255, 99, 132)',    // Female
          'rgb(245, 169, 184)',   // Transgender
          'rgb(156, 89, 209)',    // NonBinary+NonConforming
          'rgb(217, 217, 217)'    // Prefer not to respond
        ],
        hoverOffset: 3
      }]
    };

    const doughnutChart = new Chart(doughnutCTX, {
      type: 'doughnut',
      data: genderData,
      options: {},
      plugins: []
    });

    const barChart = new Chart(barCTX, {
      type: 'bar',
      data: genderData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: []
    });
    // Charts End

  }

}
