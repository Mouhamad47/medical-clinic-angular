import { Message } from './../classes/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @ViewChild('scroller') private messageContainer: ElementRef
  user: { id: number, firstname: string, lastname: string }
  user_id: number = +localStorage.getItem('id');
  messageFrom: FormGroup;
  messagesCollection: AngularFirestoreCollection<Message>;
  sentMessages: Message[];
  recievedMessages: Message[];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private apiservice: ApiService, private router: Router,
    private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params['id'],
      firstname: this.route.snapshot.params['firstname'],
      lastname: this.route.snapshot.params['lastname'],
    };
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.firstname = params['firstname'];
        this.user.lastname = params['lastname'];

      }
    )
    this.messageFrom = new FormGroup({
      'message': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)])
    })

    setTimeout(() => {
      this.getMessagesSent();

    }, 500);


  }
  scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }


  getUserInfo() {
    this.apiservice.selectUserInfo().subscribe(data => {
      this.user_id = data['id'];
      console.log(this.user_id);
    })
  }

  sendMessage() {
    let timestamp: number = Date.now();
    let groupChatId: string = `${this.user_id}-${this.user.id}`;
    const itemMessage: Message = {
      content: this.messageFrom.get('message').value,
      idFrom: this.user_id,
      idTo: +this.user.id,
      timestamp: timestamp
    }
    this.apiservice.addMessage(itemMessage, groupChatId)
    this.messageFrom.reset();


  }

  getMessagesSent() {
    let groupChatId: string = `${this.user_id}-${this.user.id}`;

    this.apiservice.messagesFromOneToTwo(groupChatId).subscribe(data => {
      this.sentMessages = data.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    })
  }







}
