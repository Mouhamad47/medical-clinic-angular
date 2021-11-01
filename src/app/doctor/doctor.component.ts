import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Major } from '../classes/major';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  addDoctorForm: FormGroup;

  allMajors: Major[];
  allDoctors: User[];
  dynamicDoctorArray: User = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    date_of_employment: null,
    major_id: null,
    role: null,

  }


  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.addDoctorForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      // 'date_of_employment': new FormControl(null, [Validators.required]),
      'role': new FormControl(2, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      'major_id': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),

    })

    this.getAllDoctors();
    this.getAllMajors();
  }

  getAllDoctors() {
    this.apiservice.selectAllDoctors().subscribe(data => {
      this.allDoctors = data;
      console.log(data);
    })
  }
  getAllMajors() {
    this.apiservice.selectMajors().subscribe(data => {
      this.allMajors = data;
      console.log(data);
    })
  }

  addDoctor() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.addDoctorForm.get('email').value, this.addDoctorForm.get('password').value)
      .then((response) => {
        const registerUser: User = {
          first_name: this.addDoctorForm.get('first_name').value,
          last_name: this.addDoctorForm.get('last_name').value,
          email: this.addDoctorForm.get('email').value,
          password: this.addDoctorForm.get('password').value,
          address: this.addDoctorForm.get('address').value,
          role: this.addDoctorForm.get('role').value,
          major_id: this.addDoctorForm.get('major_id').value,
          uid: response.user.uid,

        }
        this.apiservice.register(registerUser).subscribe((data: User) => {

          console.log("Sucess", data);
          this.addDoctorForm.reset();
        })
      })


  }
  removeDoctor(id: number, i: number) {
    this.apiservice.deleteDoctor(id).subscribe((User: User) => {
      this.allDoctors.splice(i, 1);
      alert("Doctor has been deleted")
    })
  }




}
