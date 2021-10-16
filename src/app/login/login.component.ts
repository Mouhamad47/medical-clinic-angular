import { ActivatedRoute,Router } from '@angular/router';
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
 
  constructor(private httpClient :HttpClient, private apiservice:ApiService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  
}
