import { CandidateComponent } from './candidate/candidate.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { JobapplicationComponent } from './jobapplication/jobapplication.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { NurseComponent } from './nurse/nurse.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { AuthguardGuard } from './classes/authguard.guard';


const routes: Routes = [
  {path:'', component:WelcomepageComponent},  
  {path: 'login', component:LoginComponent},
  {path: 'jobapplication', component: JobapplicationComponent },
  {path: 'bookappointment',component:BookappointmentComponent},
  {path: 'admin', canActivate:[AuthguardGuard], component:AdminComponent, children :[
    {path:  'dashboard',component:DashboardComponent},
    {path : 'doctors', component :DoctorComponent},
    {path : 'nurses', component :NurseComponent},
    {path : 'editprofile',component:EditprofileComponent},
    {path : 'appointments',component:AppointmentComponent},
    {path : 'consultations', component:ConsultationComponent},
    {path : 'candidates', component : CandidateComponent},
    {path : 'chat',component:ChatComponent ,children :[
      {path :'messages', component :MessageComponent}
    ]},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
