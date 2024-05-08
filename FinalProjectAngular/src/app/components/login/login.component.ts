import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginDto } from '../../models/login-dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminDto } from '../../models/admin-dto';
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  isAdminLogin : boolean = false;
  errorMessage:string="";

 login : LoginDto = new LoginDto();

 adminLogin : AdminDto = new AdminDto();

  constructor(private loginService: LoginService, private router: Router, private userIdService : IdService) {
   
  }
  
  onUserLogin() {
    this.loginService.userLogin(this.login).subscribe(
      {
        next: (data)=> {
          this.login=data;
          console.log("Login:",data);
          sessionStorage.clear();
          sessionStorage.setItem("userId",data.id);
          console.log(data.id);
          sessionStorage.setItem("role","user");    
          this.router.navigateByUrl("home");
        },
        error: (err) => {
          console.log(err);
          if (err.status == "0")
          this.errorMessage = " Network error, please try again later."
          else
          alert(err.error);
        },
        complete : () => {
          console.log("Server completed sending data")
        }
      }
    )
  }

  openAdminLogin() {
    this.isAdminLogin = true;
  }
  closeAdminLogin() {
    this.isAdminLogin = false;
  }

  onAdminLogin() {
    this.loginService.adminLogin(this.adminLogin).subscribe(
      {
        next: (data)=> {
          this.login=data;
          console.log("Login:",data);
          sessionStorage.clear();
          sessionStorage.setItem("adminId",data.id);
          console.log(typeof this.userIdService);
          sessionStorage.setItem("role","admin");
    
          this.router.navigateByUrl("admincrud");
          
        },
        error: (err) => {
          console.log(err);
          if (err.status == "0")
          this.errorMessage = " Network error, please try again later."
       else
          alert(err.error);
        },
        complete : () => {
          console.log("Server completed sending data")
        }
      }
    )
  }

  signIn() {
    this.router.navigateByUrl("sign-in");
  }
}



