import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router,private authService:AuthService){}
  userName:string;
  password:string;
  token:string;
  login1:boolean = true;

 login(){
  this.login1 = false;
  sessionStorage.removeItem("token");
  this.authService.login(this.userName,this.password).subscribe((data) =>{(this.token = data)
  sessionStorage.setItem("token",JSON.stringify(this.token))
  var a = JSON.stringify(this.token)
  if(a == "null"){ 
    this.router.navigate(['register']);   
  } 
  else if(JSON.parse(sessionStorage.getItem("token")).role == 0){
    this.router.navigate(['admin']);     
  }
  else if(JSON.parse(sessionStorage.getItem("token")).role == 1){
    this.router.navigate(['user']);     
  }       
  });  
}
}
