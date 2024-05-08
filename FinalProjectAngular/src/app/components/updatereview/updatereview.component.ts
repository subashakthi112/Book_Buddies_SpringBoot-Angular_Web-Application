import { Component } from '@angular/core';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatereview',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatereview.component.html',
  styleUrl: './updatereview.component.css'
})
export class UpdatereviewComponent {
  id: string | null = "";
  review:Review=new Review();
  errorMessage: string = "";

  constructor(private ReviewService: ReviewService,private router:Router, private activatedRoute: ActivatedRoute){
    this.review=new Review();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


}

ngOnInit():void{
  if(this.id != null) {
this.ReviewService.getReviewById(this.id).subscribe(
  {
    next: (data) => {
      console.log("update - get book by id", data);
      this.review=data;

    },
    error: (err) => {
      console.log(err);
      if (err.status == "0")
      this.errorMessage = " Network error, please try again later."
   else
      alert(err.error);
     
    }
  
  }
  
)
}
}

updatereview(){
  console.log(this.ReviewService);
  this.ReviewService.updatereview(this.review).subscribe(
    {
      next:(data)=>{
        this.review=data;
        console.log("updated review",data);
        this.router.navigateByUrl("home");

      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Server completed sending data")
      }
    }
  );
}
}
