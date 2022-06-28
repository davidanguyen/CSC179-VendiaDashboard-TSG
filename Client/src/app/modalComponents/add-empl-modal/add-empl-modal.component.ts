import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

// Import the client to modal
import { client } from '../../app.component';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { fieldNameFromStoreName } from '@apollo/client/cache';
const { entities } = client;

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-add-empl-modal',
  templateUrl: './add-empl-modal.component.html',
  styleUrls: ['./add-empl-modal.component.scss']
})

export class AddEmplModalComponent implements OnInit {
  checkStep: number = 0;
  getLastEmplID: any;
  getNextEmplID?: any;
  isLoading: boolean = false;
  isLoading2: boolean = true;

  // Set empty data for submission
  submitModel = {};

  async loadIndexData(data: any) {
    var loadingData = data.map((x: any) => x.EmployeeID).sort((a: number, b: number) => a - b).pop();
    this.getLastEmplID = loadingData;
    this.getNextEmplID = loadingData + 1;
    console.log(this.getNextEmplID);
  }

  async submitEmployeeDetails(): Promise<void> {
    // Load the data, get last index, increment the last found number
    this.isLoading = true;
    console.log(this.submitModel); // EVERYTHING
    // Submit the data into the server
    //const addTest = await entities.employees.add(joinedObjects);

    this.isLoading = false;
    this._snackBar.open('Employee successfully added!', '', {
      panelClass: ['snackbarSuccess'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });

    this.dialog.closeAll();
  }

  stepperForm: StepType[] = [
    {
      label: 'Personal Information',
      fields: [
        {
          key: 'EmployeeID',
          type: 'input',
          defaultValue: this.getNextEmplID,
          templateOptions: {
            label: 'Employee ID',
            required: false,
            description: 'Automatically generated field',
            readonly: true,
          },
          //hideExpression: 'true',
        },
        {
          fieldGroupClassName: 'columns',
          fieldGroup: [
            {
              className: 'column',
              key: 'First',
              type: 'input',
              templateOptions: {
                label: 'First Name',
                required: true,
              }
            },

            {
              className: 'column',
              key: 'Last',
              type: 'input',
              templateOptions: {
                label: 'Last Name',
                required: true,
              }
            },
          ],
        },
        {
          fieldGroupClassName: 'columns',
          fieldGroup: [
            {
              className: 'column',
              key: 'Age',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Age',
                description: 'How old are you?',
                required: true,
              }
            },
            {
              className: 'column',
              key: 'Gender',
              type: 'select',
              templateOptions: {
                label: 'Select',
                description: 'What do you identify as?',
                required: true,
                options: [
                  { value: 0, label: '' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Transgender', label: 'Transgender' },
                  { value: 'Non-Binary/Non-Conforming', label: 'Non-Binary/Non-Conforming' },
                  { value: 'Prefer not to respond', label: 'Prefer not to respond' },
                ],
              },
            },
          ],
        }
      ]
    },

    {
      label: 'Health Information',
      fields: [
        {
          fieldGroupClassName: 'columns',
          fieldGroup: [
            {
              className: 'column',
              key: 'Height',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Height',
                description: 'Height in Inches',
                required: true,
              }
            },
            {
              className: 'column',
              key: 'Weight',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Weight',
                description: 'Weight in Pounds(LBs)',
                required: true,
              }
            },
          ]
        },
        {
          key: 'BodyTemp',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Body Temperature',
            description: 'F°',
            required: true,
          }
        },
        {
          fieldGroupClassName: 'columns',
          fieldGroup: [
            {
              className: 'column',
              key: 'PulseRate',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Pulse Rate',
                description: 'Beats Per Minute (bpm)',
                required: true,
              }
            },
            {
              className: 'column',
              key: 'BloodPressure',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Blood Pressure',
                description: 'mm Hg',
                required: true,
              }
            },
            {
              className: 'column',
              key: 'RespirationRate',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Respiration Rate',
                description: 'Breaths per Minute (BPM)',
                required: true,
              }
            },
          ]
        },
        {
          key: 'ExcerciseAvgPerWeek',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Avg Hours of Exercise',
            description: 'Average Hours of Exercise Per Week',
            required: true,
          }
        },
      ]
    },
    {
      label: 'Work Information',
      fields: [
        {
          fieldGroupClassName: 'columns',
          fieldGroup: [
            {
              className: 'column',
              key: 'WorkAvgPerWeek',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Avg Hours of Work',
                description: 'Average Hours of Work Per Week',
                required: true,
              }
            },
            {
              className: 'column',
              key: 'VacationBalance',
              type: 'input',
              templateOptions: {
                type: 'number',
                label: 'Vacation Hours',
                description: '',
                required: true,
              }
            },
          ]
        },
      ]
    },
  ];

  form: any = new FormArray(this.stepperForm.map(() => new FormGroup({})));
  options = this.stepperForm.map(() => <FormlyFormOptions>{});

  prevStep(stepperForm: any) {
    this.checkStep = stepperForm - 1;
  }

  nextStep(stepperForm: any) {
    this.checkStep = stepperForm + 1;
  }



  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog,) { }

  async ngOnInit() {
    console.log("loading.........")
    const getData = await (await entities.employees.list()).items;
    this.loadIndexData(getData);
    console.log(this.getNextEmplID);
    console.log(this.form);
    this.isLoading2 = false;
    this.form.controls[0].controls['EmployeeID'].value = this.getNextEmplID;

  }

}
