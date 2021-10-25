import { User } from './../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login(form) {
    this.apiservice.loginVerification(form.value.email, form.value.password)
      .pipe(first())
      .subscribe(data => {
        if (data['role'] == 1) {
          this.router.navigate(['/admin/dashboard']);
        }

      })
  }




}
