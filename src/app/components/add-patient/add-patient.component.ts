import {Component, OnInit} from '@angular/core';
import {PatientRequest} from "../../models/patient.request.model";
import {Gender} from "../../models/gender.enum";
import {DiabetesState} from "../../models/diabetes.state.enum";
import {PatientService} from "../../services/patient.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patient} from "../../models/patient.model";
import {Country} from "../../models/country.model";
import {City} from "../../models/city.model";
import {AppValidators} from "../validators/validators";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientRequest: PatientRequest = {
    firstName: '',
    lastName: '',
    gender: Gender.FEMALE,
    city: '',
    country: '',
    age: 0,
    diabetesState: DiabetesState.UNKNOWN

  };
  submitted = false;

  genders = Object.keys(Gender);
  diabetesStates = Object.keys(DiabetesState);

  //TODO: Pull Contries and Cities from Backend, filtering cities that apply to chosen country
  cities: any = ["Paris", 'Brussels', 'Alger', 'Harare']
  countries: any = ['France', 'Germany', 'Algeria', 'Zimbabwe']

  form: FormGroup;
  filterMinors: boolean
  patients: Patient[];

  constructor(private patientService: PatientService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterMinors = false;
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        age: ['', Validators.required,  AppValidators.isNumber],
        diabetesState: ['']
      })

    this.getPatients();

  }

  onSubmit(): void {
    const data = {
      firstName: this.patientRequest.firstName,
      lastName: this.patientRequest.lastName,
      gender: this.patientRequest.gender,
      city: this.patientRequest.city,
      country: this.patientRequest.country,
      age: this.patientRequest.age,
      diabetesState: this.patientRequest.diabetesState
    };

    if (this.form.invalid) {
      console.log("Form is invalid")
      return;
    }

    this.patientService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      console.log("Checked value is true")
      this.filterMinors = true

      if (this.patients.length > 0) {
        this.patients = this.patients.filter(patient => patient.age < 18
        );
      }
    } else {
      this.filterMinors = true
      this.getPatients();
    }
  }

  getPatients() {
    this.patientService.findAll()
      .subscribe(
        response => {
          this.patients = response
        },
        error => {
          console.log(error);
        });
  }
}
