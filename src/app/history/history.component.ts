import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

export interface Survey2 {
  question: string;
  answertype: string;
  options: string[];
}

export interface Survey {
  _id: string;
  userid: string;
  title: string;
  email: string;
  survey: Survey2[];
}

export class HistoryRootObject {
  message: string="";
  Survey: Survey[]=[];
}


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  public data:any;
  public token:any;

  constructor(
    private route: Router,
    public httpClient:HttpClient
  ){
  }

  ngOnInit() {

    
    let token_parse;
   const auth_token=localStorage.getItem("currentuser")
   console.log(auth_token)
   if(auth_token){
    token_parse=JSON.parse(auth_token)
    this.token=token_parse["data"]["token"]
    console.log("extract the token ", this.token)
   }
   let headers1 = new HttpHeaders({
    'content-Type': 'application/json',
    'authorization':'Bearer '+this.token 
  });

    this.httpClient.get("http://localhost:5000/form",{headers:headers1}).subscribe((response)=>{
      console.log(response)
      this.data=response;
    })
  }
  //   //To get a UserID from URL
  //   this.url = (this.route.routerState.snapshot.url)
  //   this.userID = this.url.split('/')[2]

  //   this.allservices.getAllSurveyofUser(this.userID).subscribe((response: HistoryRootObject) => {
  //     // console.log(response);
  //     this.data = response;
  //     console.log(this.data.Survey)
  //   });


  // }


  //Delete Survey By Survey ID
  deleteSurvey(survey_id:any){
    console.log(survey_id)
    let headers1 = new HttpHeaders({
      'content-Type': 'application/json',
      'authorization':'Bearer '+this.token 
    });
    this.httpClient.delete(`http://localhost:5000/form/${survey_id}`,{headers:headers1}).subscribe(response=>{
    console.log(response);
    alert("Survey Deleted Successfully..");
    location.reload();
    })
    
    
  }

  //Publish Survey Link
  publishlink(survey_id:any){
    alert('http://localhost:4200/dynamic/'+survey_id)
    window.open('http://localhost:4200/dynamic/'+survey_id,'_blank')
    
  }

  // //Get All Responses
  getAllResponsesBy(survey_id:any){
     alert("All Responses of Survey ID "+survey_id)
     window.open(`http://localhost:4200/survey_responses/${survey_id}`)
  }


}
