import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Survey {
  question: string;
  answertype: string;
  options: string[];
}

export class RootObject {
  title: string = "";
  email: string = "";
  survey: Survey[] = [];
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit {
  public data: any;
  public url: string = '';
  public surveyID: String = '';
  dynamicForm = this.fb.group({});
  public email: any;
  constructor(

    private fb: FormBuilder,
    private route: Router,
    public http: HttpClient

  ) { }
  ngOnInit() {

    // this.data ={
    //   title:"Demo Form",
    //   description:"dhsdhs",
    //   questions:[
    //     {
    //       questionContent:"Enter Your Name:",
    //       questionNo:1,
    //       questionType:"short"
    //     },
    //     {
    //       questionContent:"age:",
    //       questionNo:2,
    //       questionType:"short"
    //     },
    //     {
    //       questionContent:"Enter No:",
    //       questionNo:3,
    //       questionType:"Number"
    //     },
    //     {
    //       questionContent:"Gender",
    //       questionNo:4,
    //       questionType:"single",
    //       options:["Male","Female","Other"]
    //     }
    //   ]
    // }
    // let token;
    // let token_parse;
    // const auth_token = localStorage.getItem("currentuser")
    // console.log(auth_token)
    // if (auth_token) {
    //   token_parse = JSON.parse(auth_token)
    //   token = token_parse["data"]["token"]
    //   console.log("extract the token ", token)
    // }
    // let headers1 = new HttpHeaders({
    //   'content-Type': 'application/json',
    //   'authorization': 'Bearer ' + token
    // });
    this.url = this.route.routerState.snapshot.url;
    this.surveyID = this.url.split('/')[2];

    this.http.get(`http://localhost:5000/form/form/${this.surveyID}`).subscribe((response) => {
      console.log(response)
      this.data = response;
    })
    //To get a SurveyID from URL
    
    


  }


  saveForm(form:NgForm){
   console.log(form.value)
   console.log(this.email)

   console.log(this.data.questions)
   let finalObj={
    title:this.data.title,
    email:this.email,
    formId:this.data._id,
    survey:[{}]
   }
   let answer=Object.entries(form.value);

   let i=0;
   this.data.questions.forEach((que:any)=>{
    // console.log(que.questionContent)

    let q={
      question:que.questionContent,
      answer:answer[i++][1]
    }
    console.log(q)
    finalObj.survey.push(q)
    
   })
   finalObj.survey.shift()
   


   let token;
   let token_parse;
   const auth_token=localStorage.getItem("currentuser")
   console.log(auth_token)
   if(auth_token){
    token_parse=JSON.parse(auth_token)
    token=token_parse["data"]["token"]
    console.log("extract the token ", token)
   }
   let headers1 = new HttpHeaders({
    'content-Type': 'application/json',
    'authorization':'Bearer '+token 
  });

    this.http.post('http://localhost:5000/response/', finalObj, {
        headers: headers1
      })
      .subscribe((response: any) => {
        console.log(response);
        
      });
  }
}
