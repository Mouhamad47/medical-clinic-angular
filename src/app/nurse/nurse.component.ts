import { User } from './../classes/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Major } from '../classes/major';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  showTable: boolean = true;
  addNurseForm: FormGroup;
  allNurses: User[];
  lastTwoMajors: Major[];
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router,private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.addNurseForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      'role': new FormControl(3, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      'major_id': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),

    });
    this.getAllNurses();
    this.getMajors();
  }

  addNurse() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.addNurseForm.get('email').value, this.addNurseForm.get('password').value)
    .then((response)=>{
      const registerUser: User = {
        first_name: this.addNurseForm.get('first_name').value,
        last_name: this.addNurseForm.get('last_name').value,
        email: this.addNurseForm.get('email').value,
        password: this.addNurseForm.get('password').value,
        address: this.addNurseForm.get('address').value,
        role: this.addNurseForm.get('role').value,
        major_id: this.addNurseForm.get('major_id').value,
        uid: response.user.uid,
      }
      this.apiservice.register(registerUser).subscribe((data: User) => {
      this.addNurseForm.reset();
      alert("Nurse Registered Successfully");
    })
    })
  
  }
  getMajors() {
    this.apiservice.selectLastTwoMajors().subscribe(data => {
      this.lastTwoMajors = data;
      
    })
  }
  getAllNurses() {
    this.apiservice.selectAllNurses().subscribe(data => {
      this.allNurses = data;
      
    })
  }
  removeNurse(id: number, i: number) {
    this.apiservice.deleteNurse(id).subscribe((User: User) => {
      this.allNurses.splice(i, 1);
      alert("Nurse has been deleted")
    })

  }



}
