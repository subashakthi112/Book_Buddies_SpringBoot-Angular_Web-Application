import { Component, OnInit } from '@angular/core';
import { SubscriptionDetail } from '../../models/subscription-detail';
import { SubscriptionService } from '../../services/subscription.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { SubscriptionPlan } from '../../models/subscription-plan';
import { UpdateSubscriptionDto } from '../../models/update-subscription-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Razorpay: any;



@Component({
  selector: 'app-subscriptions-view',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subscriptions-view.component.html',
  styleUrl: './subscriptions-view.component.css'
})
export class SubscriptionsViewComponent{
  userId=sessionStorage.getItem("userId");
  id=0;
  subscriptions:SubscriptionDetail[]=[];
  errorMessage:string="";
  
  
 constructor(private subscriptionService :SubscriptionService,private dialog:MatDialog,private route:ActivatedRoute,private location:Location,private paymentService:PaymentService,private router:Router,private snackBar:MatSnackBar){
    if(this.userId!=undefined){
      this.id=parseInt(this.userId,10);
      console.log("userid:" + this.id);
  }
  this.subscriptionService.getSubscriptionsByUserId(this.id).subscribe({
    next: (data)=> {
      this.subscriptions=data;
     console.log("Subscriptions:",data);
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
  });
}
  
extendSubscription(subscriptionId?:number){
  let paymentSuccessful = false;
  const dialogRef=this.dialog.open(SubscribeComponent,{
    width:'400px',
    });
  dialogRef.componentInstance.planSelected.subscribe((subscriptionPlan:SubscriptionPlan)=>{  
    if(subscriptionPlan){
      let updateSubscriptionDto:UpdateSubscriptionDto=new UpdateSubscriptionDto(subscriptionId,subscriptionPlan.name);
      this.subscriptionService.extendSubscription(updateSubscriptionDto).subscribe(
      {
        next: (data) => {
          console.log("Subscription successful", data);

          // Subscribe to the createTransactionForSubscription Observable
          this.paymentService.createTransactionForSubscription(subscriptionId).subscribe({
              next: (transactionData) => {
                  this.openTransactioModal(transactionData);
                  console.log("Transaction created successfully", transactionData);
                  
                 
                  
              },
              error: (transactionErr) => {
                  console.error("Transaction creation failed", transactionErr);
              },
              complete: () => {
                  console.log("Transaction creation completed");
              }
          });
          
      },
       error:(err:any) => {
         console.log("Subscription failed",err);
         alert(err.error);
        },
       complete : () => {
         console.log("Completed posting data");
        }
      }
    );
      }else{
        console.error('No plan selected.');
      }
    });
  }



  renewSubscription(subscriptionId?:number){
    const dialogRef=this.dialog.open(SubscribeComponent,{
      width:'400px',
      data:{subscriptionId:subscriptionId}
    });
    dialogRef.componentInstance.planSelected.subscribe((subscriptionPlan:SubscriptionPlan)=>{  
      if(subscriptionPlan){
        let updateSubscriptionDto:UpdateSubscriptionDto=new UpdateSubscriptionDto(subscriptionId,subscriptionPlan.name);
        this.subscriptionService.renewSubscription(updateSubscriptionDto).subscribe(
        {
          next: (data) => {
            console.log("Subscription successful", data);

            // Subscribe to the createTransactionForSubscription Observable
            this.paymentService.createTransactionForSubscription(subscriptionId).subscribe({
                next: (transactionData) => {
                    this.openTransactioModal(transactionData);
                    console.log("Transaction created successfully", transactionData);
                    
                    
                    
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
           console.log("Subscription failed",err);
           alert(err.error);
          },
         complete : () => {
           console.log("Completed posting data");
          }
        }
      );
        }else{
          console.error('No plan selected.');
        }
      });
  }


  ngOnInit(): void {
    this.subscriptionService.cancelExpiredSubscriptions().subscribe(
      {
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error(error);
        }
      }
    );
  }
  
  viewEbook(bookId?:number) {
    this.subscriptionService.getSubscriptionsByUserId(this.id).subscribe(
      (subscriptions: SubscriptionDetail[]) => {
        const subscriptionForBook = subscriptions.find(subscription => subscription.book?.bookId === bookId);
        if(subscriptionForBook){
          if (subscriptionForBook.expireDate != undefined) {
            const currentDate = new Date();
            const expiryDate = new Date(subscriptionForBook.expireDate);
            const expiryDateOnly = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
            const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
         if (expiryDateOnly < currentDateOnly && expiryDateOnly!==currentDateOnly) { 
            alert('Your subscription for this book has expired. Please renew to continue reading.');
            console.log(currentDate);
            console.log(expiryDate);
        } else if(subscriptionForBook.subscriptionStatus==="PAYMENT PENDING"){
            alert('Please make the payment to continue reading');
            this.paymentService.createTransactionForSubscription(subscriptionForBook.subscriptionId).subscribe({
              next: (transactionData) => {
                  this.openTransactioModal(transactionData);
                  console.log("Transaction created successfully", transactionData);
                  
                  
                  
              },
              error: (transactionErr) => {
                  console.error("Transaction creation failed", transactionErr);
              },
              complete: () => {
                  console.log("Transaction creation completed");
              }
          });
        }
        else{
          window.open(subscriptionForBook.book?.pdfLink, '_blank');
        }
    }
}
      }
    );
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
        window.location.reload();
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
