import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Major } from '../classes/major';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  addDoctorForm :FormGroup;
 
  allMajors : Major[];
  allDoctors : User[];
  dynamicDoctorArray :User={
    id :null,
    first_name :'',
    last_name : '',
    email : '',
    password: '',
    address : '',
    date_of_employment : null,
    major_id: null,
    role : null,

  }
    

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.addDoctorForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'address': new FormControl(null, [Validators.required,Validators.minLength(4), Validators.maxLength(15)]),
      // 'date_of_employment': new FormControl(null, [Validators.required]),
      'role': new FormControl(2, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      'major_id': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      
    })

    this.getAllDoctors();
    this.getAllMajors();
  }

  getAllDoctors(){
    this.apiservice.selectAllDoctors().subscribe(data=>{
      this.allDoctors = data;
      console.log(data);
    })
  }
  getAllMajors(){
    this.apiservice.selectMajors().subscribe(data=>{
      this.allMajors = data;
      console.log(data);
    })
  }

  addDoctor(){
    this.apiservice.register(this.addDoctorForm.value).subscribe((data:User)=>{
      // this.dynamicDoctorArray['id'] = data.id;
      // this.dynamicDoctorArray['first_name'] = data.first_name;
      // this.dynamicDoctorArray['last_name'] = data.last_name;
      // this.dynamicDoctorArray['email'] = data.email;
      // this.dynamicDoctorArray['password'] = data.password;
      // this.dynamicDoctorArray['address'] = data.address;
      // this.dynamicDoctorArray['major_id'] = data.major_id;
      // this.dynamicDoctorArray['major_name'] = data
      // this.allDoctors.push(this.dynamicDoctorArray);
      console.log("Sucess",data);
      this.addDoctorForm.reset();
    })
    
  }




}
