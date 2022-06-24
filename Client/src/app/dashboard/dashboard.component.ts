import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { AddEmplModalComponent } from '../modalComponents/add-empl-modal/add-empl-modal.component';
import { EditEmplModalComponent } from '../modalComponents/edit-empl-modal/edit-empl-modal.component';
import { OverallShareModalComponent } from '../modalComponents/overall-share-modal/overall-share-modal.component';
import { MatTable } from '@angular/material/table';


export interface EmployeeData {
  pos: number;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bodyTemp: number;
  pulseRate: number;
  bloodPressure: number;
  respirationRate: number;
  exerciseAvg: number;
  vacationBalance: number;
  workAvg: number;
}

const EMPL_DATA: EmployeeData[] = [
  {
    pos: 1,
    name: 'Zeus Josh',
    age: 23,
    gender: 'Male',
    height: 1,
    weight: 1,
    bodyTemp: 1,
    pulseRate: 1,
    bloodPressure: 1,
    respirationRate: 1,
    exerciseAvg: 1,
    vacationBalance: 1,
    workAvg: 1
  },
  {
    pos: 2,
    name: 'Johnny Appleseed',
    age: 44,
    gender: 'Non-Binary/Non-Conforming',
    height: 2,
    weight: 2,
    bodyTemp: 2,
    pulseRate: 2,
    bloodPressure: 2,
    respirationRate: 2,
    exerciseAvg: 2,
    vacationBalance: 2,
    workAvg: 2
  },
];


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

  // Table Init
  displayedColumns: string[] = [
    'pos', 'name', 'age',
    'height', 'weight', 'bodyTemp',
    'pulseRate', 'bloodPressure',
    'respirationRate','vacationBalance',
    'exerciseAvg', 'workAvg',
  ];
  dataSource = [...EMPL_DATA];

  @ViewChild(MatTable) table!: MatTable<EmployeeData>;

  constructor(
    public dialog: MatDialog,
  ) { }

  addData() {
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }


  // ADD EMPLOYEE MODAL
  addEmplModal() {
    const dialogRef = this.dialog.open(AddEmplModalComponent);
  }

  // EDIT EMPLOYEE MODAL
  editEmplModal() {
    const dialogRef = this.dialog.open(EditEmplModalComponent);
  }

  // SHARE STATS MODAL
  shareOverallModal() {
    const dialogRef = this.dialog.open(OverallShareModalComponent);
  }

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
