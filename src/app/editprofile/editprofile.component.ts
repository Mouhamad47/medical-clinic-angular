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

  userInfo: User[];
  editProfileForm: FormGroup;
  editPassowrd: FormGroup;

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.getUserInfo();
    
    this.editProfileForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),

    })
    this.editPassowrd = new FormGroup({
      'current_password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'new_password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'confirm_password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    })

   


  }

  getUserInfo(){
    this.apiservice.selectUserInfo().subscribe(data=>{
      this.userInfo = data;
      this.editProfileForm.patchValue({
        'first_name': this.userInfo['first_name'],
        'last_name' :  this.userInfo['last_name'],
        'address' : this.userInfo['address']
      });
    })
  }

  updateProfile(){
    this.apiservice.putProfile(this.editProfileForm.value).subscribe((data:User)=>{
      console.log("SUCCESS");
    })
    console.log(this.editProfileForm.value);
  }



}
