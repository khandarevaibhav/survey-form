import { HeadComponent } from '../head/head.component';
import { ShortAnsComponent } from '../short-ans/short-ans.component';
import { NumberComponent } from '../number/number.component';
import { EmailComponent } from '../email/email.component';
import { SingleCorrectComponent } from '../single-correct/single-correct.component';
import { MultipleCorrectComponent } from '../multiple-correct/multiple-correct.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AllservicesService } from 'src/app/allservices.service';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

//Questions Format
export class Questions {
  questionContent: string | null | undefined;
  answerType: string;
  options: string[] = []
  constructor(question: string, answerType: string, option: string[]) {
    this.questionContent = question
    this.answerType = answerType
    this.options = option
  }
}

//Parent Object
export class RootObject {
  title: string | null;
  email: string | null;
  description:string|null;
  questions: Questions[] = [];
  constructor(title: string, email: string, description:string,survey: Questions[]) {
    this.title = title
    this.email = email
    this.description=description
    this.questions = survey
  }
}



@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit{

  constructor(
    // public allservices:AllservicesService,
    public router:Router,
    public http:HttpClient
    ) { }
    
  ngOnInit(): void {
    // if(!localStorage.getItem('token'))
    //   this.router.navigate(['/signin']);
    // else
    //   this.router.navigate(['/mainpage'])
  }

  formElements = [
    'Title',
    'Email',
    'Short Answer',
    'Single Correct',
    'Multiple Correct',
    'Number',
  ];

  mainForm = [
    'Title',
    'Email'
  ];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'formElements' &&
      event.container.id === 'mainForm'
    ) {
      const formElement = event.previousContainer.data[event.previousIndex];
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex] = formElement;
    } else if (
      event.previousContainer.id === 'mainForm' &&
      event.container.id === 'formElements'
    ) {
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  @ViewChild(HeadComponent)
  headComponent!: HeadComponent;

  @ViewChild(ShortAnsComponent)
  shortAnsComponent!: ShortAnsComponent;

  @ViewChild(NumberComponent)
  numberComponent!: NumberComponent;

  @ViewChild(EmailComponent)
  emailComponent!: EmailComponent;

  @ViewChild(SingleCorrectComponent)
  singleCorrectComponent!: SingleCorrectComponent;

  @ViewChild(MultipleCorrectComponent)
  multipleCorrectComponent!: MultipleCorrectComponent;

  onFormSubmit() {

    // if(localStorage.getItem('email')!==this.emailComponent.getValue()){
    //   alert("Please enter your Current login Email..");
    //   return;
    // }
    //root object
    let jsonobj: RootObject = new RootObject('', '','', []);
    
    for (let i = 0; i < this.mainForm.length; i++) {
      
      const key = this.mainForm[i];
      switch (key) {

        case 'Title':
          let temp=this.headComponent.getValue()
          jsonobj.title = temp.formTitle;
          jsonobj.description=temp.formDescription;
          break;

        case 'Short Answer':
          let short = this.shortAnsComponent.getValue();
          // short.forEach((question: string | null) => {
            let que: Questions = new Questions("", "", [])
            que.questionContent = short.question;
            que.answerType = 'Short Answer';
            console.log(que)
            jsonobj.questions.push(que);
          // });
          break;

        case 'Email':
          jsonobj.email = this.emailComponent.getValue();
          break;


        case 'Single Correct':
          let q: Questions = new Questions("", "", [])
          let single = this.singleCorrectComponent.getValue();
          q.questionContent = single.question;
          q.answerType = 'Single Correct';

          if (single.option)
            (single.option).forEach((ele: any) => {
              q.options.push(ele);
            });

          jsonobj.questions.push(q)
          break;

        case 'Number':
          let number = this.numberComponent.getValue();
          let n: Questions = new Questions("", "", [])
          n.questionContent = number.question;
          n.answerType = 'Number';
          jsonobj.questions.push(n);
          break;
        default:
          break;
      }
    }

    console.log(jsonobj);
    console.log("after")
  //   // // Store formData in the database
  //  this.allservices.createSurvey(jsonobj).subscribe(response=>{
  //   console.log(response);
  //   alert("Survey Created Successfully....");
  //   location.reload();

  //  })
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
  
      this.http
        .post('http://localhost:5000/form/', jsonobj, {
          headers: headers1,
        })
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/home'])
        });
  

  }





}





















































//Previous Code Start

// import { Component, ViewChild } from '@angular/core';
// import {
//   CdkDragDrop,
//   copyArrayItem,
//   moveItemInArray,
// } from '@angular/cdk/drag-drop';
// import { HeadComponent } from '../head/head.component';
// import { ShortAnsComponent } from '../short-ans/short-ans.component';
// import { NumberComponent } from '../number/number.component';
// import { EmailComponent } from '../email/email.component';
// import { DateComponent } from '../date/date.component';
// import { SingleCorrectComponent } from '../single-correct/single-correct.component';
// import { MultipleCorrectComponent } from '../multiple-correct/multiple-correct.component';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import axios from 'axios';
// import { Router } from '@angular/router';

// const formElementsMapping = {
//   Title: 'app-head',
//   'Short Answer': 'app-short-ans',
//   Number: 'app-number',
//   Email: 'app-email',
//   Date: 'app-date',
//   'Single Correct': 'app-single-correct',
//   'Multiple Correct': 'app-multiple-correct',
// };

// @Component({
//   selector: 'app-create-form',
//   templateUrl: 'create-form.component.html',
//   styleUrls: ['create-form.component.scss'],
// })
// export class CreateFormComponent {
//   constructor(public router: Router,
//     public httpclient: HttpClient) {}

//   formElements = [
//     // 'Title',
//     'Short Answer',
//     'Number',
//     // 'Email',
//     // 'Date',
//     'Single Correct',
//     // 'Multiple Correct',
//   ];

//   mainForm = ['Title', 'Short Answer', 'Number', 'Single Correct'];

//   drop(event: CdkDragDrop<any>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     } else if (
//       event.previousContainer.id === 'formElements' &&
//       event.container.id === 'mainForm'
//     ) {
//       const formElement = event.previousContainer.data[event.previousIndex];
//       copyArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//       event.container.data[event.currentIndex] = formElement;
//     } else if (
//       event.previousContainer.id === 'mainForm' &&
//       event.container.id === 'formElements'
//     ) {
//       event.previousContainer.data.splice(event.previousIndex, 1);
//     }
//   }

//   @ViewChild(HeadComponent)
//   headComponent!: HeadComponent;

//   @ViewChild(ShortAnsComponent)
//   shortAnsComponent!: ShortAnsComponent;

//   @ViewChild(NumberComponent)
//   numberComponent!: NumberComponent;

//   @ViewChild(EmailComponent)
//   emailComponent!: EmailComponent;

//   @ViewChild(DateComponent)
//   dateComponent!: DateComponent;

//   @ViewChild(SingleCorrectComponent)
//   singleCorrectComponent!: SingleCorrectComponent;

//   @ViewChild(MultipleCorrectComponent)
//   multipleCorrectComponent!: MultipleCorrectComponent;

//   onFormSubmit() {

//     const formData: any[] = [];

//     for (let i = 0; i < this.mainForm.length; i++) {
//       if (this.mainForm[i] in formElementsMapping) {
//         const key = this.mainForm[i] as keyof typeof formElementsMapping;
//         const component = this.getComponentForKey(key);
//         for (let j = 0; j < component.length; j++) {
//           formData.push({
//             type: key,
//             data: component[j].getValue(),
//           });
//         }
//       }
//     }

   
//     ////// Code for chinmay starts here /////
//     console.log('--------original----------');
//     console.log(formData);
//     console.log('--------converted form data----------');
// const input = formData;

// const output = {
//   title: '',
//   description: 'form description',
//   questions: [] as {
//     questionContent: string;
//     answerType:String;
//     questionNumber: number;
//   //  options=Array;
//   }[],
// };

// let questionNumber = 1;

// for (let i = 0; i < input.length; i++) {
//   const obj = input[i];

//   if (obj.type === 'Title') {
//     output.title = obj.data.formTitle;
//   } else if (obj.type !== 'Description') {
//     const questionObj = {
//       questionContent: obj.data.question,
//       answerType: obj.type,
//       questionNumber: questionNumber,
//     };



//     output.questions.push(questionObj);

//     questionNumber++;
//   }
// }

// console.log(output);


//     ///// Code for chinmay ends here /////






//     // console.log(formData);
//     // Store formData in the database
//    let token;
//    let token_parse;
//    const auth_token=localStorage.getItem("currentuser")
//    console.log(auth_token)
//    if(auth_token){
//     token_parse=JSON.parse(auth_token)
//     token=token_parse["data"]["token"]
//     console.log("extract the token ", token)
//    }
//    let headers1 = new HttpHeaders({
//     'content-Type': 'application/json',
//     'authorization':'Bearer '+token 
//   });

//     this.httpclient
//       .post('http://localhost:5000/form/', output, {
//         headers: headers1,
//       })
//       .subscribe((response: any) => {
//         console.log(response);
//         this.router.navigate(['/home'])
//       });

//       // const apiRsp=axios.post('http://localhost:5000/form/',{
//       //   headers:{
//       //     'content-Type': 'application/json',
//       //     'authorization':'Bearer '+token 

//       //   },
//       //   formData
//       // })





//   }





//   getComponentForKey(key: string) {
//     switch (key) {
//       case 'Title':
//         return [this.headComponent];
//       case 'Short Answer':
//         return [this.shortAnsComponent];
//       case 'Number':
//         return [this.numberComponent];
//       case 'Email':
//         return [this.emailComponent];
//       case 'Date':
//         return [this.dateComponent];
//       case 'Single Correct':
//         return [this.singleCorrectComponent];
//       case 'Multiple Correct':
//         return [this.multipleCorrectComponent];
//       default:
//         return [];
//     }
//   }
// }