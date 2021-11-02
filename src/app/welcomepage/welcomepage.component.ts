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
  consultationSlots: Array<string> = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
  ];
  consultationSlotsRebuild: Array<string> = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
  ];
  appointmentsSlots: Array<string> = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
  ];
  takenSlots: Array<any> = [];
  today: number = Date.now();
  today_date: Date = new Date();
  weekAhead: number = this.today_date.setDate(this.today_date.getDate() + 7);

  consultationForm: FormGroup;
  // date:Date = new Date();
  // latestDate = this.datepipe.transform(this.date,'yyyy-MM-dd');
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

    })
    this.imgAnimation();
    this.headerAnimation();
    this.getAllMajors();
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
  createConsutation() {
    this.apiservice.addConsultation(this.consultationForm.value).subscribe((data: Consultation) => {
      alert('Consultation has been booked');
      this.consultationForm.reset();
    })
    // console.log(this.consultationForm.value);
  }
  getAvailableConsultationsSlots(date: string, major_id: number) {
    this.apiservice.selectAvailableConsultationSlots(date, major_id).subscribe((data: any) => {
      this.takenSlots = data;
      // console.log(this.takenSlots);
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
  desableSlot() {
    this.consultationForm.get('start_hour').disable();
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


}
