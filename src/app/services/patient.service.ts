import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Patient} from "../models/patient.model";

const baseUrl = 'http://localhost:8484/api/1.0/emr/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(baseUrl);
  }

  findPatient(searchTerm: any): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${baseUrl}?term=${searchTerm}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

}
