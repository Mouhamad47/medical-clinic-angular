import { JobApplication } from './../classes/jobapplication';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidates : JobApplication[];
  showTable: boolean = true;


  constructor(private httpClient: HttpClient, private apiservice: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllCandidates();
    this.checkEmptyState();
  }
  checkEmptyState(){
    if(this.candidates?.length>0){
      this.showTable = true;
    }
    else{
      this.showTable = false;
    }
  }

  getAllCandidates(){
    this.apiservice.selectCandidates().subscribe(data=>{
      this.candidates = data;
      
    })
  }
  approveCandidate(id:number, i:number){
    this.apiservice.deleteCandidate(id).subscribe((JobApplication:JobApplication)=>{
      this.candidates.splice(i,1);
      console.log("Candidate declined");
    })
    
  }

}
