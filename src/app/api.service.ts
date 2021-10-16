
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap, retry, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //   redirectUrl:String;
  //   url = "http://localhost:8000";
  //   // usertoken = this.getToken();
  //   usertoken = {
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-type': 'application/json',
  //         'Authorization': 'Bearer ' + this.getToken()
  //     },
  // }
  // UserInfo = this.getUserDetails();
  // username = this.UserInfo['firstname'];
  // userrole = this.UserInfo['roles'];
  
  
  
  constructor(private httpClient: HttpClient, private route:ActivatedRoute) { }

  // loginVerification(email, password):Observable<Token[]>{
  //   return this.httpClient.post<Token[]>(`${this.url}/api/login`, {email, password})
  //   .pipe(map(Token=> {
  //     this.setToken(Token['success']['token']);
  //     return Token['success']['token'];
  //   }));;
  // }

  // setToken(token:string){
  //   localStorage.setItem('token',token);
  // }
  // getToken(){
  //   return localStorage.getItem('token');
  // }
  // deleteToken(){
  //   localStorage.removeItem('token');
  // }
  // isLoggedIn(){
  //   const usertoken = this.getToken();
  //   if(usertoken!=null){
  //     return true
  //   }
  //   return false;
  // }

  // addAppointment(Patient:Patient){
  //   return this.httpClient.post<Patient>(`${this.url}/api/patient`, Patient)
  // }

  // getUserDetails():Observable<User[]> {
  //   return this.httpClient.get<User[]>(`${this.url}/api/details`,this.usertoken)
  //   .pipe(map(User =>{
  //     // console.log(User['firstname']);
  //     console.log('here');
  //     // let username = User['firstname'];
  //     // let role = User['roles']; 

  //     // console.log(this.getToken());
  //     return User;
  //   })
      
  //   );;
  // } 
  
 
}
