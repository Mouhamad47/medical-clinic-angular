import { JobApplication } from './../classes/jobapplication';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jobapplication',
  templateUrl: './jobapplication.component.html',
  styleUrls: ['./jobapplication.component.css']
})
export class JobapplicationComponent implements OnInit {

  jobAppForm: FormGroup;
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.jobAppForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      'phone_number': new FormControl(null, [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
      'degree': new FormControl('Registered Nurse', [Validators.required]),
      'experience_description': new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(40)]),
    });
  }
  createJobApp() {
    this.apiservice.addJobApp(this.jobAppForm.value).subscribe((data:JobApplication)=>{
      console.log('Sucess',data);
      this.jobAppForm.reset();
    })
    // console.log(this.jobAppForm.value);
  }


}
