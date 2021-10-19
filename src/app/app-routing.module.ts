import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { JobapplicationComponent } from './jobapplication/jobapplication.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { NurseComponent } from './nurse/nurse.component';
import { DoctorComponent } from './doctor/doctor.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';


const routes: Routes = [
  {path:'', component:WelcomepageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'jobapplication', component: JobapplicationComponent },
  {path: 'admin', component:AdminComponent, children :[
    {path:  'dashboard',component:DashboardComponent},
    {path : 'registeruser',component:RegisteruserComponent},
    {path : 'doctors', component :DoctorComponent},
    {path : 'nurses', component :NurseComponent},
    {path : 'editprofile',component:EditprofileComponent},
    {path : 'appointments',component:AppointmentComponent},
    {path : 'consultations', component:ConsultationComponent},
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
