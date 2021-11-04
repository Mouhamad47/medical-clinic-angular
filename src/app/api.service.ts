import { Section } from './classes/section';
import { Message } from './classes/message';
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
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreCollectionGroup,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Notification } from './classes/notifications';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: String;
  url = "http://127.0.0.1:8000";
  // url = "http://medical-clinic.tk";

  // usertoken = this.getToken();
  usertoken = {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    },
  }

  // messagesCollection :AngularFirestoreCollection<Message>;
  // messages : Observable<Message[]>
  idFrom : number;
  idTo : number;
  
  // UserInfo = this.getUserDetails();
  // username = this.UserInfo['firstname'];
  // userrole = this.UserInfo['roles'];
  messagesCollection: AngularFirestoreCollection<Message>;
  notificationCollection : AngularFirestoreCollection<Notification>;




  constructor(private httpClient: HttpClient, private route: ActivatedRoute,public afs:AngularFirestore) {
    
   }
  //  getItems(){
  //    return this.messages;
  //  }


  loginVerification(email, password): Observable<User[]> {
    return this.httpClient.post<User[]>(`${this.url}/api/login`, { email, password })
      .pipe(map(User => {
        if(User['user']['role'] ==1 ){
          this.setToken(User['access_token']);
          localStorage.setItem('id',User['user']['id'])
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
  addConsultation(Consultation:Consultation){
    return this.httpClient.post<Consultation>(`${this.url}/api/createconsultation`, Consultation);
  }
  addAppointment(Appointment:Appointment){
    return this.httpClient.post<Appointment>(`${this.url}/api/createappointment`, Appointment);
  }
  selectUserInfo():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/userinfo`, this.usertoken);
  }
  selectAllDoctors():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/getalldoctors`, this.usertoken);
  }
  deleteDoctor(id:number){
    return this.httpClient.delete<User>(`${this.url}/api/deletedoctor/`+id, this.usertoken);
  }
  selectAllNurses():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/getallnurses`, this.usertoken);
  }
  deleteNurse(id:number){
    return this.httpClient.delete<User>(`${this.url}/api/deletenurse/`+id, this.usertoken);
  }
  selectMajors():Observable<Major[]>{
    return this.httpClient.get<Major[]>(`${this.url}/api/getmajors`, this.usertoken);
  }
  selectSections():Observable<Section[]>{
    return this.httpClient.get<Section[]>(`${this.url}/api/getsections`, this.usertoken);
  }
  selectLastTwoMajors():Observable<Major[]>{
    return this.httpClient.get<Major[]>(`${this.url}/api/getlasttwomajors`, this.usertoken);
  }
  selectAppointments():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.url}/api/getappointments`, this.usertoken);
  }
  selectApprovedAppointments():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.url}/api/getapprovedappointments`, this.usertoken);
  }
  selectDeclinedAppointments():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.url}/api/getdeclinedappointments`, this.usertoken);
  }
  selectConsultations():Observable<Consultation[]>{
    return this.httpClient.get<Consultation[]>(`${this.url}/api/getconsultations`, this.usertoken);
  }
  selectApprovedConsultations():Observable<Consultation[]>{
    return this.httpClient.get<Consultation[]>(`${this.url}/api/getapprovedconsultations`, this.usertoken);
  }
  selectDeclinedConsultations():Observable<Consultation[]>{
    return this.httpClient.get<Consultation[]>(`${this.url}/api/getdeclinedconsultations`, this.usertoken);
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
  declineAppoinments(id:number){
    return this.httpClient.put<Appointment>(`${this.url}/api/declineappointment/`+id, this.usertoken);
  }
  approveAppointments(id:number){
    return this.httpClient.put<Appointment>(`${this.url}/api/approveappointment/`+id, this.usertoken);
  }
  deleteConsultations(id:number){
    return this.httpClient.delete<Consultation>(`${this.url}/api/deleteconsultation/`+id, this.usertoken);
  }
  declineConsultations(id:number){
    return this.httpClient.put<Consultation>(`${this.url}/api/declineconsultation/`+id, this.usertoken);
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
  selectNumberOfDoctors():Observable<Number>{
    return this.httpClient.get<Number>(`${this.url}/api/numberofdoctors`, this.usertoken);
  }
  selectNumberOfNurses():Observable<Number>{
    return this.httpClient.get<Number>(`${this.url}/api/numberofnurses`, this.usertoken);
  }
  selectNumberOfConsultations():Observable<Number>{
    return this.httpClient.get<Number>(`${this.url}/api/numberofconsultations`, this.usertoken);
  }
  selectNumberOfCandidates():Observable<Number>{
    return this.httpClient.get<Number>(`${this.url}/api/numberofcandidates`, this.usertoken);
  }
  selectConsultationsAppointments():Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/api/getconsapp`, this.usertoken);

  }
  selectConsultationGroupedByMajor():Observable<string>{
    return this.httpClient.get<string>(`${this.url}/api/getconspiechart`, this.usertoken)
  }
  selectAvailableConsultationSlots(date:string, major_id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.url}/api/getusedconsslots/`+date+`/`+major_id, this.usertoken)
  }
  selectAvailableAppoinmentSlots(date:string, section_id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.url}/api/getusedappslots/`+date+`/`+section_id, this.usertoken)
  }
  storeFirebaseUid(uid:string){
    return this.httpClient.post<string>(`${this.url}/api/storeuid`,String,this.usertoken )
  }
  selectAllUsersExceptOne(id:number):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/api/getalluerexceptlogged/`+id);
  }
  // putProfilePassword(User:User){
  //   return this.httpClient.post<User>(`${this.url}/api/updateprofile`, User,this.usertoken );
  // }
  

  messagesFromOneToTwo(s: string): Observable<Message[]> {
    return this.afs.collection('messages').doc(s).collection(s).valueChanges();

  }
  messagesFromTwoToOne(s:string):Observable<Message[]>{
    return this.afs.collection('messages').doc(s).collection(s).valueChanges();
  }

  addMessage(message:Message ,s:string){
    return this.afs.collection('messages').doc(s).collection(s).add(message);
  }
  getAdminNotifications(s:string):Observable<Notification[]>{
    return this.afs.collection('notifications').doc(s).collection(s).valueChanges();
  }
  addNotification(notification:Notification, id:string){
    return this.afs.collection('notifications').doc(id).collection(id).add(notification);
  }



}
