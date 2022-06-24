import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-empl-modal',
  templateUrl: './add-empl-modal.component.html',
  styleUrls: ['./add-empl-modal.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddEmplModalComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]],
  });

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  submitEmployeeDetails() {
    console.log("CLICKED");
  }

  ngOnInit(): void {
  }

}
