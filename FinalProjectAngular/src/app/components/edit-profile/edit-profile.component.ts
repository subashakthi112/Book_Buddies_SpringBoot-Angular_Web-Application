import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  id: string | null = "";
  user: User = new User();
constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  if(this.id != null) { 
  this.userService.getUserById(this.id).subscribe(
    {
      next: (data)=> {
        this.user=data;

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
  onUpdate() {
    this.userService.editProfile(this.user).subscribe(
      {
        next: (data)=> {
          this.user=data;

         this.router.navigateByUrl("profile");
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
