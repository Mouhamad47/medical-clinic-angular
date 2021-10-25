import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }
  logOut() {
    this.apiservice.logOut();
    window.history.forward();
    this.router.navigate(['/login']);


  }



}
