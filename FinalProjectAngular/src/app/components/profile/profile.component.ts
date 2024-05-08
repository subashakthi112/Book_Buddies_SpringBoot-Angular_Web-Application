import { Component } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : User = new User();
  userId = sessionStorage.getItem("userId");
  id = 0;
  constructor(private userService : UserService, private router: Router) {
    if(this.userId != undefined) {
      this.id = parseInt(this.userId, 10);
    }
    this.userService.userProfile(this.id).subscribe(
      {
        next : (data) => {
          this.user = data;
          console.log("user profile" , data);
        },
        error : (err) => {
          console.log(err);
        },
        complete : () => {
          console.log("Server completed sending data")
        }
      }
    )
  }


  editUser(userDet: User) {
    console.log("book to update" + userDet);
    this.router.navigateByUrl("edit-profile/" + userDet.id);
  }

}