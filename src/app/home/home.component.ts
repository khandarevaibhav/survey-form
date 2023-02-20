import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  public user_id:any;
  constructor(
    public router:Router
  ){}
  ngOnInit(): void {
 
  
   let user_parse;
   const user=localStorage.getItem("currentuser")
  
   if(user){
    user_parse=JSON.parse(user)
    this.user_id=user_parse["data"]["user"]["_id"]
    console.log("extract the token ", this.user_id)

   }
  }

  history(){
    console.log(this.user_id)
    this.router.navigate(['/history'])

    
  }

}
