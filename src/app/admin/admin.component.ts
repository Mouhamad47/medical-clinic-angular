import { Notification } from './../classes/notifications';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Notification } from '../classes/notifications';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminFirstName: String;
  adminLastName: String;
  notifications :Notification[];
  numberOfNotifications : number ;

  constructor(private http: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getUserInfo();
    }, 2000);
    this.getNotifications();
    
    
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
  getNotifications(){
    let idTo : string = '1';
    this.apiservice.getAdminNotifications(idTo).subscribe(data=>{
      this.notifications = data.sort((a,b)=>{
        return b.timestamp -a.timestamp;
      });
      // console.log(this.notifications)
    })
  }
  // sortNotifications(notifications:Notification[]){
  //   for (let i = 0; i < notifications.length; i++) {
  //     for (let j = 0; j < notifications.length; j++) {
  //      if(notifications[j].timestamp<notifications[j-1].timestamp){
  //         let temp =notifications[j];
  //         notifications[j] = notifications[j-1];
  //         notifications[j-1] = temp;
  //      }
        
  //     }
      
  //   }
    
  // }



}
