import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buy-book.component.html',
  styleUrl: './buy-book.component.css'
})
export class BuyBookComponent {
  payment: Payment = {};
  paymentCost=sessionStorage.getItem("cost");
  userId=sessionStorage.getItem("userId");
  id=0;
  errorMessage:string="";
  constructor(private paymentService: PaymentService, private router : Router) {
    this.payment = new Payment();
  }
  createTransactionAndPlaceOrder(orderForm: NgForm) {
    
    if (this.paymentCost !== null && this.userId!=undefined)  {
      this.id=parseInt(this.userId,10);
      this.payment.userId = this.id;
      this.payment.paymentStatus=false;
      
        const amount = +this.paymentCost; // Convert the string to a number using the unary plus operator
        this.payment.totalCost=amount;
        console.log(this.payment.totalCost);
        console.log(this.payment);
        console.log("payment user id: ", this.payment.userId, "session storage value: ", this.id )
        
        this.paymentService.createTransaction(this.payment).subscribe(
          {
            next: (data)=> {
              console.log("TransactionDetails:",data);
             this.openTransactioModal(data, orderForm);
            this.router.navigateByUrl("confirm-order");
              
            },
            error: (err) => {
              console.log(err);
              if (err.status == "0")
                this.errorMessage = " Network error, please try again later."
              else
                alert(err.error);
            },
            complete : () => {
              console.log("Delete done");
            }
          }
        );
    } 
    

  }

  openTransactioModal(response: any, orderForm: NgForm) {
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

  //  processResponse(resp: any, orderForm:NgForm) {
  //   this.orderDetails.transactionId = resp.razorpay_payment_id;
  //    this.placeOrder(orderForm);
  // }

  
  
}
