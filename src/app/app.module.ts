import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { JobapplicationComponent } from './jobapplication/jobapplication.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CandidateComponent } from './candidate/candidate.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AuthguardGuard } from './classes/authguard.guard';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';





@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    LoginComponent,
    AdminComponent,
    FooterComponent,
    DashboardComponent,
    DoctorComponent,
    NurseComponent,
    EditprofileComponent,
    AppointmentComponent,
    ConsultationComponent,
    JobapplicationComponent,
    ChatComponent,
    MessageComponent,
    BookappointmentComponent,
    CandidateComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),




  ],
  // schemas:[ CUSTOM_ELEMENTS_SCHEMA], 
  providers: [ApiService, AuthguardGuard,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
