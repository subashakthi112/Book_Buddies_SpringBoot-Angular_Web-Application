import { Component } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-addreview',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addreview.component.html',
  styleUrl: './addreview.component.css'
})
export class AddreviewComponent {
  review:Review=new Review();
  userId=sessionStorage.getItem("userId");
  id: string | null = "";
  bookId:number | null=0;
  customerId:number | null=0;
  constructor(private reviewService: ReviewService,private router:Router, private activatedRoute: ActivatedRoute){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.review=new Review();
     

    if(this.userId!=undefined){
      this.customerId=parseInt(this.userId,10);
      this.review.userId=this.customerId;
    }

    if (this.id !== null) {
      const bookId = parseInt(this.id, 10);
      if (!isNaN(bookId)) {
        this.review.bookId = bookId;
      } 
    } 
  }

  addReview(){
    this.reviewService.addReview(this.review).subscribe({
      next: (data) => {
        this.review = data;
        console.log("Data:", data);
        this.router.navigateByUrl("home");
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("Server completed sending data");
      }
    });
  }
  
}
