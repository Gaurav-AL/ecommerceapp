import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckOutServicesService {

  private formGroupSubject = new BehaviorSubject<FormGroup | null>(null);
  formGroup$ = this.formGroupSubject.asObservable();

  setCheckOutFormGroup(formGroup: FormGroup) {
    this.formGroupSubject.next(formGroup);
  }
  constructor() { }
}
