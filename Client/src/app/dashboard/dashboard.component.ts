import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Observable, Observer } from 'rxjs';
import { AddEmplModalComponent } from '../modalComponents/add-empl-modal/add-empl-modal.component';
import { EditEmplModalComponent } from '../modalComponents/edit-empl-modal/edit-empl-modal.component';
import { OverallShareModalComponent } from '../modalComponents/overall-share-modal/overall-share-modal.component';
import { client } from '../app.component'
import { assertWrappingType, valueFromAST } from 'graphql';
import { resultKeyNameFromField } from '@apollo/client/utilities';

const { entities } = client;

export interface EmployeeData {
  EmployeeID: number;
  name: string;
  Age: number;
  Gender: string;
  Height: number;
  Weight: number;
  BodyTemp: number;
  PulseRate: number;
  BloodPressure: number;
  RespirationRate: number;
  ExcerciseAvgPerWeek: number;
  WorkAvgPerWeek: number;
  VacationBalance: number;
  action: string;
}

export interface EmployeeCalcs {
  label: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  time = new Date();

  // Properties
  title: string = "Dashboard";
  icon: string = "dashboard";
  username: string = "Name"; // pass it in from header user
  getTime: string = this.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  randomQuote: string = "“Java is to JavaScript what Car is to Carpet.” – Chris Heilmann";
  numEmpl?: number = 0;
  isLoading: boolean = true;

  // Tile Genders
  genderDataSelection: FormGroup;
  allGenders: any;
  male: any;
  female: any;
  transgender: any;
  nonB: any;
  noResponse?: any;

  // Mat Tab Tile Calcs
  tabIndex = 0;
  asyncTabs: Observable<EmployeeCalcs[]>;

  // Table Init
  displayedColumns: string[] = [
    'EmployeeID', 'name', 'Age',
    'Height', 'Weight', 'BodyTemp', 'PulseRate', 'BloodPressure',
    'RespirationRate', 'ExcerciseAvgPerWeek',
    'WorkAvgPerWeek', 'VacationBalance', 'action'
  ];
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    // Form for gender selection
    this.genderDataSelection = this.formBuilder.group({
      sMale: [true],
      sFemale: [true],
      sTransgender: [true],
      sNonBinary: [true],
      sNoResponse: [true],
    });

    // Dynamic Tiles/MatTabs Start
    this.asyncTabs = new Observable((observer: Observer<EmployeeCalcs[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Gender', value1: 1, value2: 11, value3: 31, value4: 42 },
          { label: 'Age', value1: 2, value2: 10, value3: 32, value4: 40 },
          { label: 'Height', value1: 3, value2: 9, value3: 33, value4: 49 },
          { label: 'Weight', value1: 4, value2: 8, value3: 34, value4: 48 },
          { label: 'Body Temperature', value1: 5, value2: 7, value3: 35, value4: 47 },
          { label: 'Pulse Rate', value1: 6, value2: 6, value3: 36, value4: 46 },
          { label: 'Blood Pressure', value1: 7, value2: 5, value3: 37, value4: 45 },
          { label: 'Respiration Rate', value1: 8, value2: 4, value3: 38, value4: 44 },
          { label: 'Avg Exercise Hours', value1: 9, value2: 3, value3: 39, value4: 43 },
          { label: 'Avg Work Hours', value1: 10, value2: 2, value3: 30, value4: 42 },
          { label: 'Vacation Balance', value1: 11, value2: 1, value3: 34, value4: 41 },
        ]);
      }, 500);
    });
    // Dynamic Tiles/MatTabs End

  }

  @ViewChild(MatTable) table!: MatTable<EmployeeData>;

  // LOAD EACH DATA FROM THE SERVER
  loadData(data: any) {
    this.numEmpl = data?.length;
    this.dataSource = data?.map((x:any) => x);
    this.allGenders = data?.map((x: any) => x.Gender);
    this.male = this.allGenders.filter((x: any) => x === "Male").length;
    this.female = this.allGenders.filter((x: any) => x === "Female").length;
    this.transgender = this.allGenders.filter((x: any) => x === "Transgender").length;
    this.nonB = this.allGenders.filter((x: any) => x === "Non-Binary/Non-Conforming").length;
    this.noResponse = this.allGenders.filter((x: any) => x === "Prefer not to respond").length;

    this.isLoading = false;
  }

  async ngOnInit(): Promise<void> {
    //Load all the data first
    const getData = await (await entities.employees.list()).items;
    this.loadData(getData);

    // Register all chart controllers
    Chart.register(...registerables);

    // Charts
    const doughnutCTX = 'genderPie';
    const barCTX = 'genderBar';
    const genderData = {
      labels: ['Male', 'Female', 'Transgender', 'Non-Binary/Non-Conforming', 'Prefer not to respond'],
      datasets: [{
        label: 'Genders',
        data: [this.male, this.female, this.transgender, this.nonB, this.noResponse], //insert data from server here
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

    const allData = {
      labels: ['Male', 'Female', 'Transgender', 'Non-Binary/Non-Conforming', 'Prefer not to respond'],
      datasets: [
        {
          label: 'Age',
          backgroundColor: 'rgba(255, 159, 64)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Height',
          backgroundColor: 'rgba(255, 205, 86)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Weight',
          backgroundColor: 'rgba(75, 192, 192)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Body Temperature',
          backgroundColor: 'rgba(54, 162, 235)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Pulse Rate',
          backgroundColor: 'rgba(153, 102, 255)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Blood Pressure',
          backgroundColor: 'rgba(201, 203, 207)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Respiration Rate',
          backgroundColor: 'rgba(255, 120, 201)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Avg. Exercise',
          backgroundColor: 'rgba(120, 251, 255)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Avg. Work',
          backgroundColor: 'rgba(120, 129, 255)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Vacation Bal.',
          backgroundColor: 'rgba(36, 143, 0)',
          data: [65, 59, 80, 81, 56]
        }
      ]
    }

    const doughnutChart = new Chart(doughnutCTX, {
      type: 'doughnut',
      data: genderData,
      options: {},
      plugins: []
    });

    const barChart = new Chart(barCTX, {
      type: 'bar',
      data: allData,
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

  async devButton() {
    // console.log("Loading Data...");
    // const addTest = await entities.employees.add(
    //   {
    //     EmployeeID: 2,
    //     First: 'Zeus',
    //     Last: 'Josh',
    //     Age: 23,
    //     Gender: 'Male',
    //     Height: 67,
    //     Weight: 140,
    //     BodyTemp: 95,
    //     PulseRate: 110,
    //     BloodPressure: 80,
    //     RespirationRate: 23,
    //     ExcerciseAvgPerWeek: 10,
    //     WorkAvgPerWeek: 10,
    //     VacationBalance: 3,
    //   }
    // );
  }

  changeTab(event: any) {
    console.log(event.index);
    this.tabIndex = event.index;
  }

  addData() {
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

  // MATH FUNCTIONS
  calcMean(terms: number) {
    // m = sumofterms/numberofterms
    var result;
    return result;
  }

  calcMode() {
    var result;
    return result;
  }

  calcRange() {
    // range = max-min
    var result;
    return result;
  }

  calcStdDev() {
    var result;
    return result;
  }
}
