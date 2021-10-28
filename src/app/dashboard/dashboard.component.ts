import { Consultation } from './../classes/consultation';
import { Appointment } from './../classes/appointment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  viewConsultations = "Accepted";
  viewAppointments = "Accepted";
  approvedAppointments :Appointment[];
  declinedAppointments : Appointment[];
  approvedConsultations : Consultation[];
  declinedConsultations : Consultation[];
  numberOfCandidates:Number;
  numberOfNurses:Number;
  numberOfDoctors:Number;
  numberOfConsultations:Number;
  
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.getNumberOfDoctors();
      this.getNumberOfNurses();
      this.getNumberOfConsultations();
      this.getNumberOfCandidates();
      this.getApprovedAppointments();  
      this.getDeclinedAppointments();
      this.getApprovedConsultations();
      this.getDeclinedConsultations();
      this.getChartData();


  }
  //Bar CHart
  title = 'practice';

  public myData :any = [];
   
  public chartColumns = ['Month', 'Consultations', 'Appointments'];

  public myOptions = {
    colors: ['#318787', '#79CDCD'],
    is3D: true,
    legend: 'bottom'
  };
  public type = 'BarChart'

  //Pie Chart
  public myData1 = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],

  ];
  public chartColumns1 = ['City', 'Inhabitants'];

  public myOptions1 = {
    colors: ['#318787', '#45B0B0', '#61BDBD', '#79CDCD', '#9CDCDC'],
    is3D: true,
    legend: 'bottom'
  };
  public type1 = 'PieChart';

  clickViewConsultation() {
    if (this.viewConsultations == "Accepted") {
      this.viewConsultations = "Rejected"
     
    }
     else {
      this.viewConsultations = "Accepted"
    }
  }
  clickViewAppointment(){
    if(this.viewAppointments == "Accepted"){
      this.viewAppointments = "Rejected"
    }
    else{
      this.viewAppointments = "Accepted"
    }
  }

  getApprovedAppointments(){
    this.apiservice.selectApprovedAppointments().subscribe(data=>{
      this.approvedAppointments = data;
    })
  }
  getDeclinedAppointments(){
    this.apiservice.selectDeclinedAppointments().subscribe(data=>{
      this.declinedAppointments = data;
    })
  }
  getApprovedConsultations(){
    this.apiservice.selectApprovedConsultations().subscribe(data=>{
      this.approvedConsultations = data;
    })
  }
  getDeclinedConsultations(){
    this.apiservice.selectDeclinedConsultations().subscribe(data=>{
      this.declinedConsultations = data;
    })
  }
  getNumberOfDoctors(){
    this.apiservice.selectNumberOfDoctors().subscribe(data=>{
      this.numberOfDoctors = data;
    })
  }
  getNumberOfNurses(){
    this.apiservice.selectNumberOfNurses().subscribe(data=>{
      this.numberOfNurses = data;
    })
  }
  getNumberOfConsultations(){
    this.apiservice.selectNumberOfConsultations().subscribe(data=>{
      this.numberOfConsultations = data;
    })
  }
  getNumberOfCandidates(){
    this.apiservice.selectNumberOfCandidates().subscribe(data=>{
      this.numberOfCandidates = data;
    })
  }
  getChartData(){
    this.apiservice.selectConsultationsAppointments().subscribe(data=>{
     this.myData = data;
      console.log(data);
    })
  }

}
