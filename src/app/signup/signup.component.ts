// import { Component } from '@angular/core';
// import {
//   FormControl,
//   FormGroupDirective,
//   NgForm,
//   Validators,
//   FormGroup,
// } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';

// import { HttpClient,HttpHeaders } from '@angular/common/http';

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(
//       control &&
//       control.invalid &&
//       (control.dirty || control.touched || isSubmitted)
//     );
//   }
// }

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss'],
// })
// export class SignupComponent {

//   constructor(
//     public httpclient:HttpClient
//   ){
    
//   }
//   emailFormControl = new FormControl('', [
//     Validators.required,
//     Validators.email,
//   ]);
//   passwordFormControl = new FormControl('', [
//     Validators.required,
//     Validators.minLength(6),
//     Validators.maxLength(20),
//   ]);

//   confirmPasswordFormControl = new FormControl('', [
//     Validators.required,
//     Validators.minLength(6),
//     Validators.maxLength(6),
//   ]);

//   matcher = new MyErrorStateMatcher();

//   signupForm = new FormGroup({
//     email: this.emailFormControl,
//     password: this.passwordFormControl,
//     confirmPassword: this.confirmPasswordFormControl,
//   });


//   submit() {
//     console.log(this.signupForm.value)

//     let headers1=new HttpHeaders({
//       'content-Type': 'application/json'
//     })
//     let obj={
//       username:'admin12',
//       email_id:this.signupForm.value.email,
//       password:this.signupForm.value.password
//     }
//     this.httpclient.post("http://localhost:7600/reg",obj,{headers:headers1}).subscribe(response=>{
//       console.log(response)
//     })

//   }
// }


import { Component, OnInit} from '@angular/core';
import axios from 'axios';
//import axios

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  type: string = "password";
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash";
  lastName:any;
  firstName:any;
  username: any;
  password:any;
  email:any;

  constructor(){ }

  ngOnInit(): void {
    console.log(this.email)
    
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type = "text" : this.type="password";

  }


  handleSubmit (event: Event){
    event.preventDefault();


    //get user inputs
    //event.target.password
    this.firstName="";
    this.lastName="";
    const userInput={
      username: this.username,
      email: this.email,
      password: this.password


    }

    

    console.log("userInput", userInput)
    
    
    //api call
    const apiRes=axios.post("http://localhost:5000/users/signup", userInput)

    console.log(apiRes)
    this.username="";
    
    this.email="";
    this.password="";
 
    // const temp={
    //  username:e.target.username.value,
    //  password:e.target.password.value
    // }
 
    // console.log(temp)
    // return false;
   }
}