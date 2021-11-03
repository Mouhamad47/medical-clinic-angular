import { Section } from './../classes/section';
import { Appointment } from './../classes/appointment';
import { Notification } from './../classes/notifications';
import { Consultation } from './../classes/consultation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Major } from './../classes/major';
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  // scroll:boolean = true;
  headeranimation: boolean = false;
  fade: boolean = false;
  // today : string = new Date().toDateString();
  allMajors: Major[];
  allSections: Section[];
  consultationSlots: Array<string> = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
  ];
  appointmentsSlots: Array<string> = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
  ];
  takenSlots: Array<any> = [];
  takenSlotsApp: Array<any> = [];

  today: number = Date.now();
  today_date: Date = new Date();
  weekAhead: number = this.today_date.setDate(this.today_date.getDate() + 7);

  consultationForm: FormGroup;
  appointmentForm: FormGroup;

  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.consultationForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'phone_number': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      'date_of_consultation': new FormControl(null, [Validators.required]),
      'start_hour': new FormControl(null, [Validators.required]),
      'major_id': new FormControl(null, [Validators.required]),

    });
    this.appointmentForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'phone_number': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      'date_of_appointment': new FormControl(null, [Validators.required]),
      'start_hour': new FormControl(null, [Validators.required]),
      'section_id': new FormControl(null, [Validators.required]),
    })

    this.imgAnimation();
    this.headerAnimation();
    this.getAllMajors();
    this.getAllSections();
    this.desableSlot();
    


  }

  imgAnimation() {
    if (this.fade === false) {

      this.fade = true;
    }
  }
  headerAnimation() {
    if (this.headeranimation === false) {

      this.headeranimation = true;
    }
  }

  getAllMajors() {
    this.apiservice.selectMajors().subscribe(data => {
      this.allMajors = data;
      console.log(data);
    })
  }
  getAllSections() {
    this.apiservice.selectSections().subscribe(data => {
      this.allSections = data;
    })
  }
  createConsutation() {
    this.apiservice.addConsultation(this.consultationForm.value).subscribe((data: Consultation) => {
      this.sendConsultationNotification();
      alert('Consultation has been booked');
      this.consultationForm.reset();
    })
    
  }

  createAppointment() {
    this.apiservice.addAppointment(this.appointmentForm.value).subscribe((data: Appointment) => {
      this.sendAppointmentNotification();
      alert('Appointment has been booked');
      this.appointmentForm.reset();
    })
    
  }

  getAvailableConsultationsSlots(date: string, major_id: number) {
    this.apiservice.selectAvailableConsultationSlots(date, major_id).subscribe((data: any) => {
      this.takenSlots = data;
      // console.log(this.takenSlots);
    })
  }
  getAvailableAppointmentsSlots(date: string, section_id: number) {
    this.apiservice.selectAvailableAppoinmentSlots(date, section_id).subscribe((data: any) => {
      this.takenSlotsApp = data;
      // console.log(data);
    })
  }
  checkAvailableConsSLot() {
    let start_hour = this.consultationForm.get('start_hour');
    let date = this.consultationForm.get('date_of_consultation');
    let major_id = this.consultationForm.get('major_id');
    if (!date.pristine || !major_id.pristine) {
      this.consultationSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
      ];
    }

    if (date.dirty || major_id.dirty) {
      start_hour.enable();
      this.getAvailableConsultationsSlots(date.value, major_id.value);
      setTimeout(() => {

        this.chechSlotsAvailablity();

      }, 2000);


    }

  }
  checkAvailableAppSLot() {

    let start_hour = this.appointmentForm.get('start_hour');
    let date = this.appointmentForm.get('date_of_appointment');
    let section_id = this.appointmentForm.get('section_id');
    if (!date.pristine || !section_id.pristine) {
      this.appointmentsSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
      ];
    }

    if (date.dirty || section_id.dirty) {
      start_hour.enable();
      this.getAvailableAppointmentsSlots(date.value, section_id.value);
      setTimeout(() => {
        // console.log("hello from checkslots availability app")

        this.chechSlotsAvailablityApp();

      }, 2000);


    }

  }
  desableSlot() {
    this.consultationForm.get('start_hour').disable();
    this.appointmentForm.get('start_hour').disable();
  }
  
  chechSlotsAvailablity() {
    for (let i: number = 0; i < this.consultationSlots.length; i++) {
      for (let j: number = 0; j < this.takenSlots.length; j++) {
        if (this.takenSlots[j] == this.consultationSlots[i]) {
          this.consultationSlots.splice(i, 1);
        }
      }
    }
  }
  chechSlotsAvailablityApp() {
    for (let i: number = 0; i < this.appointmentsSlots.length; i++) {
      for (let j: number = 0; j < this.takenSlotsApp.length; j++) {
        if (this.takenSlotsApp[j] == this.appointmentsSlots[i]) {
          this.appointmentsSlots.splice(i, 1);
        }
      }
      // console.log(this.takenSlotsApp[0]);
    }
  }

  sendConsultationNotification() {
    let timestamp: number = Date.now();
    let idTo: string = "1";
    const itemNotification: Notification = {
      content: "You have a new consultation",
      idTo: 1,
      timestamp: timestamp,
      title: "Consultation"
    }
    this.apiservice.addNotification(itemNotification, idTo)
  }
  sendAppointmentNotification() {
    let timestamp: number = Date.now();
    let idTo: string = "1";
    const itemNotification: Notification = {
      content: "You have a new appointment",
      idTo: 1,
      timestamp: timestamp,
      title: "Appointment"
    }
    this.apiservice.addNotification(itemNotification, idTo)
  }



}
