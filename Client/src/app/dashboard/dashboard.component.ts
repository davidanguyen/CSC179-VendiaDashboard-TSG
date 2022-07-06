import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { filter, Observable, Observer, reduce } from 'rxjs';
import { AddEmplModalComponent } from '../modalComponents/add-empl-modal/add-empl-modal.component';
import { EditEmplModalComponent } from '../modalComponents/edit-empl-modal/edit-empl-modal.component';
import { OverallShareModalComponent } from '../modalComponents/overall-share-modal/overall-share-modal.component';
import { client } from '../app.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnaryOperatorExpr } from '@angular/compiler';

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
  value1: any;
  value2: any;
  value3: any;
  value4: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboard.component.scss']
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
  isLoadingDash: boolean = false;
  gData?: any;

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
  tabs: Observable<EmployeeCalcs[]>;

  // Table Init
  dataSource: any;
  displayedColumns: string[] = [
    'EmployeeID', 'name', 'Age',
    'Height', 'Weight', 'BodyTemp', 'PulseRate', 'BloodPressure',
    'RespirationRate', 'ExcerciseAvgPerWeek',
    'WorkAvgPerWeek', 'VacationBalance', 'action'
  ];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    // Form for gender selection
    this.genderDataSelection = this.formBuilder.group({
      sMale: [true],
      sFemale: [true],
      sTransgender: [true],
      sNonBinary: [true],
      sNoResponse: [true],
    });

    this.tabs = new Observable((observer: Observer<EmployeeCalcs[]>) => { });
  }

  @ViewChild(MatTable) table!: MatTable<EmployeeData>;

  // LOAD EACH DATA FROM THE SERVER
  async loadChartData(data: any) {
    this.numEmpl = data?.length;
    this.dataSource = data?.map((x: any) => x);
    this.allGenders = data?.map((x: any) => x.Gender);

    // Get count of "Genders"
    this.male = this.allGenders.filter((x: any) => x === "Male").length;
    this.female = this.allGenders.filter((x: any) => x === "Female").length;
    this.transgender = this.allGenders.filter((x: any) => x === "Transgender").length;
    this.nonB = this.allGenders.filter((x: any) => x === "Non-Binary/Non-Conforming").length;
    this.noResponse = this.allGenders.filter((x: any) => x === "Prefer not to respond").length;

    this.isLoading = false;
  }

  // ALLOW TO RELOAD DATA IF NEW DATA IS IN
  async reloadData() {
    this.isLoading = true;

    // get updated data from server
    const update = await (await entities.employees.list()).items;
    this.loadChartData(update);
    this.loadAllCalcData(update);
  }

  async ngOnInit(): Promise<void> {
    //Load all the data first
    const loadedData = await (await entities.employees.list()).items;
    this.loadAllCalcData(loadedData);
    this.loadChartData(loadedData);

    // Register all chart controllers
    Chart.register(...registerables);

    // Charts
    this.donutGenderChart();
    this.allAvgChart(loadedData);
    // Charts End
  }

  // Doughnut chart that shows total number of each gender
  donutGenderChart() {
    const doughnutCTX = 'genderPie';

    const genderData = {
      labels: ['Male', 'Female', 'Transgender', 'Non-Binary/Non-Conforming', 'Prefer not to respond'],
      datasets: [{
        label: 'Genders',
        data: [this.male, this.female, this.transgender, this.nonB, this.noResponse],
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
  }

  // Bar chart that shows all averages
  allAvgChart(data: any) {
    const barCTX = 'genderBar';
    const allData = {
      labels: ['Age', 'Height', 'Weight', 'Body Temperature', 'Pulse Rate', 'Blood Pressure', 'Respiration Rate', 'Avg. Exercise', 'Avg. Work', 'Vacation Bal.'],
      datasets: [
        {
          label: 'Mean',
          backgroundColor: 'rgba(255, 159, 64, 0.4)',
          data: [this.calcMean(data, 'Age'), this.calcMean(data, 'Height'), this.calcMean(data, 'Weight'), this.calcMean(data, 'BodyTemp'), this.calcMean(data, 'PulseRate'), this.calcMean(data, 'BloodPressure'), this.calcMean(data, 'RespirationRate'), this.calcMean(data, 'ExcerciseAvgPerWeek'), this.calcMean(data, 'WorkAvgPerWeek'), this.calcMean(data, 'VacationBalance')]
        },
        {
          label: 'Median',
          backgroundColor: 'rgba(79, 90, 240, 0.4)',
          data: [this.calcMedian(data, 'Age'), this.calcMedian(data, 'Height'), this.calcMedian(data, 'Weight'), this.calcMedian(data, 'BodyTemp'), this.calcMedian(data, 'PulseRate'), this.calcMedian(data, 'BloodPressure'), this.calcMedian(data, 'RespirationRate'), this.calcMedian(data, 'ExcerciseAvgPerWeek'), this.calcMedian(data, 'WorkAvgPerWeek'), this.calcMedian(data, 'VacationBalance')]
        },
        {
          label: 'Mode',
          backgroundColor: 'rgba(60, 214, 83, 0.4)',
          data: [this.calcMode(data, 'Age'), this.calcMode(data, 'Height'), this.calcMode(data, 'Weight'), this.calcMode(data, 'BodyTemp'), this.calcMode(data, 'PulseRate'), this.calcMode(data, 'BloodPressure'), this.calcMode(data, 'RespirationRate'), this.calcMode(data, 'ExcerciseAvgPerWeek'), this.calcMode(data, 'WorkAvgPerWeek'), this.calcMode(data, 'VacationBalance')]
        },
        {
          label: 'Standard Deviation',
          backgroundColor: 'rgba(255, 120, 201, 0.4)',
          data: [this.calcStdDev(data, 'Age'), this.calcStdDev(data, 'Height'), this.calcStdDev(data, 'Weight'), this.calcStdDev(data, 'BodyTemp'), this.calcStdDev(data, 'PulseRate'), this.calcStdDev(data, 'BloodPressure'), this.calcStdDev(data, 'RespirationRate'), this.calcStdDev(data, 'ExcerciseAvgPerWeek'), this.calcStdDev(data, 'WorkAvgPerWeek'), this.calcStdDev(data, 'VacationBalance')]
        }
      ]
    }
    const barChart = new Chart(barCTX, {
      type: 'radar',
      data: allData,
      options: {
        elements: {
          line: { borderWidth: 3 }
        }
      }
    });
  }

  changeTab(event: any) {
    // console.log(event.index);
    this.tabIndex = event.index;
  }

  async reloadCheckEvent(event: any) {
    console.log(event);
    const update = await (await entities.employees.list()).items;
    this.loadAllCalcData(update);
  }

  async deleteEmplData(id: any) {
    // GET THE NAME OF EMPLOYEE FOR DISPLAY PURPOSES
    var nameFirstEmpl = Object.keys(id).map((x) => [id[x]])[3].pop();
    var nameLastEmpl = Object.keys(id).map((x) => [id[x]])[4].pop();

    // GET THE _id OF SELECTED EMPLOYEE
    var arrID = Object.keys(id).map((x) => [id[x]])[0].pop();

    // SET LOADING TO SHOW THAT IT IS WORKING
    this.isLoadingDash = true;

    // DELETE EMPLOYEE NOW
    await entities.employees.remove(arrID);

    // TURN OFF LOADING
    this.isLoadingDash = false;

    // RELOAD THE DATA TO SHOW CHANGES
    this.reloadData();

    // SHOW THE GOOD O' SNACK BAR
    this._snackBar.open(`Employee ${nameLastEmpl}, ${nameFirstEmpl} has been deleted.`, '', {
      panelClass: ['snackbarDanger'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6 * 1000,
    });
  }

  // ADD EMPLOYEE MODAL
  addEmplModal() {
    const dialogRef = this.dialog.open(AddEmplModalComponent);
  }

  // EDIT EMPLOYEE MODAL
  editEmplModal(id: any) {
    const dialogRef = this.dialog.open(EditEmplModalComponent);
  }

  // SHARE STATS MODAL
  shareOverallModal() {
    const dialogRef = this.dialog.open(OverallShareModalComponent);
  }

  // CONTROLLERS FOR GENDERS
  genderController(data: any) {
    // Get genders true/false
    let sMale = this.genderDataSelection.controls['sMale'].value;
    let sFemale = this.genderDataSelection.controls['sFemale'].value;
    let sTrans = this.genderDataSelection.controls['sTransgender'].value;
    let sNonBinary = this.genderDataSelection.controls['sNonBinary'].value;
    let sNoResp = this.genderDataSelection.controls['sNoResponse'].value;

    // Combine array based on boolean selection
    const genderArray = data.filter((x: any) => {
      return x.Gender === (sMale ? 'Male' : undefined)
        || x.Gender === (sFemale ? 'Female' : undefined)
        || x.Gender === (sTrans ? 'Transgender' : undefined)
        || x.Gender === (sNonBinary ? 'Non-Binary/Non-Conforming' : undefined)
        || x.Gender === (sNoResp ? 'Prefer not to respond' : undefined);
    });

    return genderArray;
  }

  //PRE-LOAD ALL CALCULATED DATA
  loadAllCalcData(data: any) {
    // Dynamic Tiles/MatTabs Start
    this.tabs = new Observable((observer: Observer<EmployeeCalcs[]>) => {
      observer.next([
        { label: 'Gender', value1: this.calcMean(data, 'Gender'), value2: 'N/A', value3: this.calcMode(data, 'Gender'), value4: 'N/A' },
        { label: 'Age', value1: this.calcMean(data, 'Age'), value2: this.calcMedian(data, 'Age'), value3: this.calcMode(data, 'Age'), value4: this.calcStdDev(data, 'Age') },
        { label: 'Height', value1: this.calcMean(data, 'Height'), value2: this.calcMedian(data, 'Height'), value3: this.calcMode(data, 'Height'), value4: this.calcStdDev(data, 'Height') },
        { label: 'Weight', value1: this.calcMean(data, 'Weight'), value2: this.calcMedian(data, 'Weight'), value3: this.calcMode(data, 'Weight'), value4: this.calcStdDev(data, 'Weight') },
        { label: 'Body Temperature', value1: this.calcMean(data, 'BodyTemp'), value2: this.calcMedian(data, 'BodyTemp'), value3: this.calcMode(data, 'BodyTemp'), value4: this.calcStdDev(data, 'BodyTemp') },
        { label: 'Pulse Rate', value1: this.calcMean(data, 'PulseRate'), value2: this.calcMedian(data, 'PulseRate'), value3: this.calcMode(data, 'PulseRate'), value4: this.calcStdDev(data, 'PulseRate') },
        { label: 'Blood Pressure', value1: this.calcMean(data, 'BloodPressure'), value2: this.calcMedian(data, 'BloodPressure'), value3: this.calcMode(data, 'BloodPressure'), value4: this.calcStdDev(data, 'BloodPressure') },
        { label: 'Respiration Rate', value1: this.calcMean(data, 'RespirationRate'), value2: this.calcMedian(data, 'RespirationRate'), value3: this.calcMode(data, 'RespirationRate'), value4: this.calcStdDev(data, 'RespirationRate') },
        { label: 'Avg Exercise Hours', value1: this.calcMean(data, 'ExcerciseAvgPerWeek'), value2: this.calcMedian(data, 'ExcerciseAvgPerWeek'), value3: this.calcMode(data, 'ExcerciseAvgPerWeek'), value4: this.calcStdDev(data, 'ExcerciseAvgPerWeek') },
        { label: 'Avg Work Hours', value1: this.calcMean(data, 'WorkAvgPerWeek'), value2: this.calcMedian(data, 'WorkAvgPerWeek'), value3: this.calcMode(data, 'WorkAvgPerWeek'), value4: this.calcStdDev(data, 'WorkAvgPerWeek') },
        { label: 'Vacation Balance', value1: this.calcMean(data, 'VacationBalance'), value2: this.calcMedian(data, 'VacationBalance'), value3: this.calcMode(data, 'VacationBalance'), value4: this.calcStdDev(data, 'VacationBalance') },
      ]);
    });
  }

  // MATH FUNCTIONS
  calcMean(data: any, tab: string): any {
    // Filter array based on T/F Selection from Tiles.
    var filteredArray: Array<any> = this.genderController(data);

    // Gender: # of checked gender / total of employees
    // Every Other: # of check gender's type / total of employees
    var result;
    var mean;
    switch (tab) {
      case 'Gender': {
        // Because gender outputs a string, it has to find the length of the string instead.
        mean = (filteredArray.map(x => x.Gender).length) / data.length;
        break;
      }
      default: {
        // Everything else that is numeric, go here.
        mean = filteredArray.reduce((x, y) => x + y[tab], 0) / data.length;
      }
    }

    // Return the result
    result = Math.round((mean + Number.EPSILON) * 100) / 100;
    return result;
  }

  calcMedian(data: any, tab: string): any {
    // Filter array based on T/F Selection from Tiles.
    var filteredArray: Array<any> = this.genderController(data);

    // Get the middle number
    const midNum = Math.floor(filteredArray.length / 2),
      // Sorts the numbers
      nums = filteredArray.map(x => x[tab]).sort((x, y) => x - y);

    // Set the middle number, if it is even sized then (x+y)/2
    return filteredArray.length % 2 !== 0 ? nums[midNum] : (nums[midNum - 1] + nums[midNum]) / 2;;
  }

  calcMode(data: any, tab: string): any {
    // Filter array based on T/F Selection from Tiles.
    var filteredArray: Array<any> = this.genderController(data);

    const mappedArray = filteredArray.map(x => x[tab]);

    switch (tab) {
      // For strings
      case 'Gender':
        const thisMode = mappedArray.reduce((x, y, i, arr) =>
          (arr.filter(v => v === x).length >= arr.filter(v => v === y).length ? x : y), '');
        return thisMode;
      // For numbers
      default:
        const objArr: any = {};
        mappedArray.forEach(x => {
          if (!objArr[x])
            objArr[x] = 1;
          else
            objArr[x] += 1;
        });

        let valueOne = 0, valueTwo = -Infinity;

        for (let key in objArr) {
          const value = objArr[key];
          if (value >= valueOne && Number(key) > valueTwo) {
            valueOne = value;
            valueTwo = Number(key);
          }
        }

        return valueTwo;
    }
  }

  calcStdDev(data: any, tab: string): any {
    // Filter array based on T/F Selection from Tiles.
    var filteredArray: Array<any> = this.genderController(data);
    var mean: any;

    switch (tab) {
      case 'Gender':
        // Find the mean of genders
        mean = (filteredArray.map(x => x.Gender).length) / data.length;
        break
      default:
        // Find the mean of everything except gender
        mean = filteredArray.reduce((x, y) => x + y[tab], 0) / data.length;
        break;
    }
    var stdDev = Math.sqrt(
      filteredArray.map(x => x[tab])
        .reduce((x, y) => x.concat((y - mean) ** 2), [])
        .reduce((x: any, y: any) => x + y, 0) /
      (filteredArray.length));
    return Math.round((stdDev + Number.EPSILON) * 100) / 100;
  }
}
