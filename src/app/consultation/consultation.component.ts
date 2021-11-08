import { Consultation } from './../classes/consultation';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Notification } from '../classes/notifications';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  allConsultations: Consultation[];
  showTable: boolean = true;

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllConsultations();
    this.checkEmptyState();

  }
  checkEmptyState() {
    if (this.allConsultations?.length > 0) {
      this.showTable = true;
    }
    else {
      this.showTable = false;
    }
  }
  getAllConsultations() {
    this.apiservice.selectConsultations().subscribe(data => {
      this.allConsultations = data;
    })
  }

  approveConsultation(id: number, i: number) {
    this.apiservice.approveConsultations(id).subscribe((Consultation: Consultation) => {
      this.allConsultations.splice(i, 1);
      alert("Consultation has been Approved");
    })

  }
  declineConsultation(id: number, i: number) {
    this.apiservice.declineConsultations(id).subscribe((Consultation: Consultation) => {
      this.allConsultations.splice(i, 1);
      alert("Consultation has been Declined");
    })
  }
  sendNotificationToDoctor(user_id: number) {
    let idTo: string = `${user_id}`;
    let timestamp: number = Date.now();
    const itemNotification: Notification = {
      content: "You have a new booking check your calendar",
      idTo: user_id,
      timestamp: timestamp,
      title: "Consultation Approved"
    }
    this.apiservice.addNotification(itemNotification, idTo);
  }

}
