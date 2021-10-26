import { Consultation } from './../classes/consultation';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  allConsultations : Consultation[];

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllConsultations();

  }
  getAllConsultations(){
    this.apiservice.selectConsultations().subscribe(data=>{
      this.allConsultations = data;
      console.log(data);
    })
  }

  approveConsultation(id:number,i:number){
    this.apiservice.approveConsultations(id).subscribe((Consultation:Consultation)=>{
      this.allConsultations.splice(i,1);
      console.log(id);
      alert("Consultation has been Approved");
    })
  }
  declineConsultation(id:number,i:number){
    this.apiservice.deleteConsultations(id).subscribe((Consultation:Consultation)=>{
      this.allConsultations.splice(i,1);
      console.log(id);
      alert("Consultation has been Declined");
    })
  }

}
