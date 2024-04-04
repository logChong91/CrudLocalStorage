import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  StudentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('datosStudent');
    if (localData != null) {
      this.StudentList = JSON.parse(localData);
    }
  }
  openModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  onDelete(item: Student) {
    const isDelete = confirm('Are you sure want to Delete');
    if (isDelete) {
      const currentRecord = this.StudentList.findIndex(
        (m) => m.id === this.studentObj.id
      );
      this.StudentList.splice(currentRecord, 1);
      localStorage.setItem('datosStudent', JSON.stringify(this.StudentList));
    }
  }

  updateStudent() {
    const currentRecord = this.StudentList.find(
      (m) => m.id === this.studentObj.id
    );
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
    }
    localStorage.setItem('datosStudent', JSON.stringify(this.StudentList));
    this.closeModel();
  }

  saveStudy() {
    const isLocalPresent = localStorage.getItem('datosStudent');
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.StudentList = oldArray;
      localStorage.setItem('datosStudent', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.StudentList = newArr;
      localStorage.setItem('datosStudent', JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }
}
