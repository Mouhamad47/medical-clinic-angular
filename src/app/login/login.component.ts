import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ApiService } from './../api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{

  loginForm: FormGroup;


  users: User = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    date_of_employment: null,
    role: null,
    major_id: null,

  }
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(25)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),

    })


  }
  ngOnDestroy() :void{
    location.reload();

  }
  

  // login() {
  //   return this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value,this.loginForm.get('password').value)
  //   .then((auth)=>{

  //     this.apiservice.loginVerification(this.loginForm.get('email').value,this.loginForm.get('password').value)
  //     .pipe(first())
  //     .subscribe(data => {
  //       if (data['role'] == 1) {
  //         this.router.navigate(['/admin/dashboard']);
  //       }

  //     })
  //   })

  // }
  login() {
    this.apiservice.loginVerification(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(data => {
        if (data['role'] == 1) {
          this.router.navigate(['/admin/dashboard']);
          
        }

      })

  }





}
