import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {
    
  scroll:boolean = true;
  headeranimation:boolean = false;
  fade :boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.headerAnimation();
    this.imgAnimation();
  }
  @HostListener("document:scroll")
  // scrollevent(){
  //     if(document.body.scrollTop > 25 || document.documentElement.scrollTop > 1 ){
  //       this.scroll = false;
  //     }
  //     else{
  //       this.scroll = true;
  //     }
  //   }
    // fadeevent(){
    //   if(document.body.scrollTop > 2000 || document.documentElement.scrollTop > 1){
    //     this.fade = true
    //   } 
    // }

  headerAnimation(){
      if(this.headeranimation === false){

        this.headeranimation = true;
      }
  }
  imgAnimation(){
      if(this.fade === false){

        this.fade = true;
      }
  }  
  

}
