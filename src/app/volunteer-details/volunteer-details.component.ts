import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

const ELEMENT_DATA: people[] = [
  {id: 1, date: '06/15/2023', isMorning: false, isAfternoon: false, isFullDay: false},
  {id: 2, date: '06/16/2023', isMorning: false, isAfternoon: false, isFullDay: false},
  {id: 3, date: '06/17/2023', isMorning: false, isAfternoon: false, isFullDay: false}
];

export interface people {
  id: number;
  date: string;
  isMorning: boolean;
  isAfternoon: boolean;
  isFullDay: boolean;
}

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss']
})

export class VolunteerDetailsComponent {

  formGroup!: FormGroup;
  post: any = '';

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    // middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    // age: ['', [Validators.required, Validators.min(8), Validators.pattern(/^[0-9]*$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
    address: this.fb.group({
      // street: [''],
      // street2: [''],
      city: [''],
      // state: [''],
      // zip: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(5)]]
    })
  });

  ageFormGroup = this.fb.group({
    age: ['', Validators.required],
  });

  confirmFormGroup = this.fb.group({
    availableServices: ['', Validators.required],
    type: ['', Validators.required],
    bgBatchNum: ['', Validators.required]
  });

  typeOptions: any[] = [
    {value: 'parent', viewValue: 'Parent'},
    {value: 'student', viewValue: 'Student'},
    {value: 'other', viewValue: 'Other'},
  ];

  foods: Observable<any[]> = of([
    {value: 'parking', viewValue: 'Parking'},
    {value: 'temple', viewValue: 'Temple'},
    {value: 'canteen', viewValue: 'Canteen'},
  ]);

  dataSource = new MatTableDataSource<people>(ELEMENT_DATA);

  public displayedColumns: string[] = [
    "date",
    "isMorning",
    "isAfternoon",
    "isFullDay"
  ];

  constructor(private fb: FormBuilder) { }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        city: '123 Drew Street'
      }
    });
  }

  isAllMorningSelected(): boolean {
    const numRows = this.dataSource.data.length;
    let selectedcount : number ;
    selectedcount= 0 ;
    this.dataSource.data.forEach(ele => {
      if (ele.isMorning === true) {
          selectedcount+=1;
      }
    });
    if (numRows === selectedcount) {
      return true
    }
    return false;
  }

  SelectAllMorning(event: MatCheckboxChange ) {
     this.dataSource.data.forEach(ele => {
      ele.isMorning =event.checked;
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    console.warn(this.ageFormGroup.value);
    console.warn(this.dataSource);
    console.warn(this.confirmFormGroup.value);
  }
}
