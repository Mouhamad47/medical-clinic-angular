import { User } from './../classes/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  allUserExcepetOne: User[];


  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUserProfile();

  }

  getAllUserExceptOne(id: number) {
    this.apiservice.selectAllUsersExceptOne(id).subscribe(data => {
      this.allUserExcepetOne = data;
      console.log(data);
    })
  }

  getUserProfile(){
    this.apiservice.selectUserInfo().subscribe(response=>{
      setTimeout(() => {

        this.getAllUserExceptOne(response['id']);

      }, 500);
      
      
    })
  }



}
