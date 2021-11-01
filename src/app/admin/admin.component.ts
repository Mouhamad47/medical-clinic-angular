import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminFirstName: String;
  adminLastName: String;

  constructor(private http: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getUserInfo();
    }, 2000);

  }
  logOut() {
    this.apiservice.logOut();
    this.afAuth.auth.signOut();
    window.history.forward();
    this.router.navigate(['/login']);


  }
  getUserInfo() {
    this.apiservice.selectUserInfo().subscribe(data => {
      this.adminFirstName = data['first_name'];
      this.adminLastName = data['last_name'];

    })
  }



}
