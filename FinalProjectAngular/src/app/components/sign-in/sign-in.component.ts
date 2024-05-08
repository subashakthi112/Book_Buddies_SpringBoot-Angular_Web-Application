import { Component } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
//  message: string = "";
  user : User = new User();
  constructor(private userService: UserService, private router : Router) {}

  onUserSignIn() {
    this.userService.userSignIn(this.user).subscribe(
      {
        next: (data)=> {
         console.log("Logged in successfully" + data);
         alert("Registration successful");
  //       this.message = "Registration successful"
         this.router.navigateByUrl("login");
        },
        error: (err) => {
          console.log(err);
        },
        complete : () => {
          console.log("Server completed sending data")
        }
      }
    )
  }
}
