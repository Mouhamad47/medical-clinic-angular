import { Consultation } from './classes/consultation';
import { JobApplication } from './classes/jobapplication';
import { User } from './classes/user';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap, retry, first } from 'rxjs/operators';
import { Major } from './classes/major';
import { Appointment } from './classes/appointment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: String;
  url = "http://127.0.0.1:8000";
  // usertoken = this.getToken();
  usertoken = {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    },
  }
  
  // UserInfo = this.getUserDetails();
  // username = this.UserInfo['firstname'];
  // userrole = this.UserInfo['roles'];



  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  loginVerification(email, password): Observable<User[]> {
    return this.httpClient.post<User[]>(`${this.url}/api/login`, { email, password })
      .pipe(map(User => {
        if(User['user']['role'] ==1 ){
          this.setToken(User['access_token']);
          // console.log(User);
          return User['user'];
        }else{
          return null;
        }
       
      }));;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
  addJobApp(JobApplication: JobApplication) {
    return this.httpClient.post<JobApplication>(`${this.url}/api/createjobapp`, JobApplication);
  }
  selectUserInfo():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/userinfo`, this.usertoken);
  }
  selectAllDoctors():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/getalldoctors`, this.usertoken);
  }
  selectAllNurses():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/getallnurses`, this.usertoken);
  }
  selectMajors():Observable<Major[]>{
    return this.httpClient.get<Major[]>(`${this.url}/api/getmajors`, this.usertoken);
  }
  selectLastTwoMajors():Observable<Major[]>{
    return this.httpClient.get<Major[]>(`${this.url}/api/getlasttwomajors`, this.usertoken);
  }
  selectAppointments():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.url}/api/getappointments`, this.usertoken);
  }
  selectConsultations():Observable<Consultation[]>{
    return this.httpClient.get<Consultation[]>(`${this.url}/api/getconsultations`, this.usertoken);
  }
  selectCandidates():Observable<JobApplication[]>{
    return this.httpClient.get<JobApplication[]>(`${this.url}/api/getjobapp`, this.usertoken);
  }
  register(User: User){
    return this.httpClient.post<User>(`${this.url}/api/register`, User, this.usertoken);
  }
  deleteAppointment(id:number){
    return this.httpClient.get<Appointment>(`${this.url}/api/deleteappointment/`+id, this.usertoken);
  }
  approveAppointments(id:number){
    return this.httpClient.put<Appointment>(`${this.url}/api/approveappointment/`+id, this.usertoken);
  }
  deleteConsultations(id:number){
    return this.httpClient.delete<Consultation>(`${this.url}/api/deleteconsultation/`+id, this.usertoken);
  }
  approveConsultations(id:number){
    return this.httpClient.put<Consultation>(`${this.url}/api/approveconsultation/`+id, this.usertoken);
  }
  putProfile (User:User){
    return this.httpClient.post<User>(`${this.url}/api/updateprofile`, User,this.usertoken );
  }
  deleteCandidate(id:number){
    return this.httpClient.get<JobApplication>(`${this.url}/api/declinejobapp/`+id, this.usertoken);
  }
 
  // putProfilePassword(User:User){
  //   return this.httpClient.post<User>(`${this.url}/api/updateprofile`, User,this.usertoken );
  // }




}
