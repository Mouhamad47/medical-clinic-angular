import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  userInfo :User[];
  editProfileForm :FormGroup;

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'password': new FormControl(null, [Validators.required, Validators.email]),
      'phone_number': new FormControl(null, [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      
    })
    this.getUserInfo();
    this.fillTheForm();
    
  }

  getUserInfo(){
    this.apiservice.selectUserInfo().subscribe(data=>{
      this.userInfo = data;
    })
  }
  fillTheForm(){
    this.editProfileForm.get('first_name').setValue("mouhamad");
  }


}
