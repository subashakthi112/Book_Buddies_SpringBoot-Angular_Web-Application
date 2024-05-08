import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { CartDto } from '../../models/cart-dto';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Review } from '../../models/review';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionPlan } from '../../models/subscription-plan';
import { SubscriptionDto } from '../../models/subscription-dto';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { ReviewService } from '../../services/review.service';
import { SubscriptionDetail } from '../../models/subscription-detail';
import { PaymentService } from '../../services/payment.service';
declare var Razorpay: any;



@Component({
  selector: 'app-viewbook',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './viewbook.component.html',
  styleUrl: './viewbook.component.css'
})
export class ViewbookComponent {
   book=sessionStorage.getItem("book");
   bookModel:Book=new Book();
   bookId:number=0;
   userId=sessionStorage.getItem("userId");
   reviewList:Review[]=[];
   id=0;
   cost=0;
   quantity=1;
   errorMessage="";
   subscriptionDetail:SubscriptionDetail[]=[];
   

   

   constructor(private bookService:BookService,private router:Router,private subscriptionService:SubscriptionService,private dialog:MatDialog,private reviewService: ReviewService,private paymentService:PaymentService){
    if(this.userId!=undefined){
      this.id=parseInt(this.userId,10);
    
    }

    if(this.book!=undefined){
      this.bookModel=JSON.parse(this.book);
      if(this.bookModel.bookId!=undefined) this.bookId=this.bookModel.bookId;
    }
    if(this.bookModel.reviewList!=undefined) this.reviewList=this.bookModel.reviewList;
   }
    addBookToCart(){
      console.log("BookId:",this.bookId);
      if(this.userId!=undefined){
        this.id=parseInt(this.userId,10);
        let cartDto:CartDto=new CartDto(this.id,this.bookId,this.quantity);
      this.bookService.addToCart(cartDto).subscribe(
        {
          next: (data)=> {
           console.log("Cart:",data); 
           this.router.navigateByUrl("cart");
         },
         error: (err) => {
           console.log(err);
           if (err.status == "0")
              this.errorMessage = " Network error, please try again later."
           else
              alert(err.error);
         },
         complete : () => {
           console.log("Completed posting data");
         }
        }
      );
      }
      else{
        alert("UserId is undefined");
      }
     }
    
     buyNow(){
      if(this.userId!=undefined){
        this.id=parseInt(this.userId,10);
      let cartDto:CartDto=new CartDto(this.id,this.bookId,this.quantity);
      if(this.bookModel.price!=undefined) this.cost = this.quantity*this.bookModel.price;
      sessionStorage.setItem("cost",this.cost.toString());
      this.bookService.buyNow(cartDto).subscribe(
        {
          next: (data)=> {
           console.log("Orders:",data);
           this.router.navigateByUrl("buybook");
         },
         error: (err) => {
           console.log(err);
           
         },
         complete : () => {
           console.log("Completed posting data");
         }
        }
      );
     }
    }

  subscribeToBook() {
    if (this.userId != undefined) {
      this.id = parseInt(this.userId, 10);
      console.log(this.id);
  
      this.subscriptionService.getSubscriptionsByUserId(this.id).subscribe(
        (subscriptions: SubscriptionDetail[]) => {
          const subscriptionForBook = subscriptions.find(subscription => subscription.book?.bookId === this.bookId);
            console.log(subscriptionForBook);
            if (subscriptionForBook) {
              if (subscriptionForBook.expireDate != undefined) {
                const currentDate = new Date();
                const expiryDate = new Date(subscriptionForBook.expireDate);
                const expiryDateOnly = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
                const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
               if (expiryDateOnly >= currentDateOnly ) {
                  alert('You already have an active subscription for this book.');
                  console.log(currentDateOnly);
                  console.log(expiryDateOnly);
                } else {
                   alert('You have already subscribed to this book, but your subscription has expired. You can renew the subscription');
                   console.log(currentDateOnly);
                  console.log(expiryDateOnly);
                   this.router.navigateByUrl("subscriptions-view");
                  } 
            }
           } else {
              const dialogRef = this.dialog.open(SubscribeComponent, {
                width: '600px',
                data: { userId: this.id }
              });
            
              dialogRef.componentInstance.planSelected.subscribe((subscriptionPlan: SubscriptionPlan) => {
                if (subscriptionPlan) {
                  let subscriptionDto: SubscriptionDto = new SubscriptionDto(this.bookId, this.id, subscriptionPlan.name);
            
                  this.subscriptionService.subscribeToBook(subscriptionDto).subscribe({
                    next: (data) => {
                      console.log("Subscription successful", data);
      
                      // Subscribe to the createTransactionForSubscription Observable
                      this.paymentService.createTransactionForSubscription(data.subscriptionId).subscribe({
                          next: (transactionData) => {
                              this.openTransactioModal(transactionData);
                              console.log("Transaction created successfully", transactionData);
                              this.router.navigateByUrl("subscriptions-view");
                              
                          },
                          error: (transactionErr) => {
                              console.error("Transaction creation failed", transactionErr);
                          },
                          complete: () => {
                              console.log("Transaction creation completed");
                          }
                      });
                      
                  },
                    error: (err) => {
                      console.log("Subscription failed", err);
                    },
                    complete: () => {
                      console.log("Completed posting data");
                    }
                  });
                } else {
                  console.error('No plan selected.');
                }
              });
            }
        }
      );
    }
  }
  
  

  

  updateReview(review: Review) {
    this.router.navigateByUrl("updatereview/" + review.reviewId);
  }

  deleteReviewById(id :number | undefined) {
    this.reviewService.deleteReviewbyId(id).subscribe(
      {
        next: (data)=> {
          console.log("Orders:",data);
          this.reviewList=data;
        },
        error: (err) => {
          console.log(err);
          
        },
        complete : () => {
          console.log("Completed posting data");
        }
      }
    )
  }
  openTransactioModal(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Book Buddies',
      description: 'Payment Page',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          // this.processResponse(response, orderForm);
          alert('Your subscription is successful. You can start reading!');
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '90909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }
  



  
}

 



