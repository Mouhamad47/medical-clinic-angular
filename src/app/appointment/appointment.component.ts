import { Appointment } from './../classes/appointment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  allAppointments : Appointment[];
  showTable: boolean = true;
  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllAppointments();
  }
 
  getAllAppointments(){
    this.apiservice.selectAppointments().subscribe(data=>{
      this.allAppointments = data;
      console.log(data);
    })
  }
  
  declineAppointment(id:number,i:number){
    this.apiservice.declineAppoinments(id).subscribe((Appointment:Appointment)=>{
      this.allAppointments.splice(i,1);
      console.log(id);
      alert("Appointment has been declined");
    })
  }

  approveAppointment(id:number,i:number){
    this.apiservice.approveAppointments(id).subscribe((Appointment:Appointment)=>{
      this.allAppointments.splice(i,1);
      console.log(id);
      alert("Appointment has been Approved");
    })
  }
  



}
