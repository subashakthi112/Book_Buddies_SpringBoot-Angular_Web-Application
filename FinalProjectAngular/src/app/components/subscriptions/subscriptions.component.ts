import { Component } from '@angular/core';
import { SubscriptionDetail } from '../../models/subscription-detail';
import { SubscriptionService } from '../../services/subscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-subscriptions',
    standalone: true,
    templateUrl: './subscriptions.component.html',
    styleUrl: './subscriptions.component.css',
    imports: [CommonModule, FormsModule,]
})
export class SubscriptionsComponent {
  subscriptions:SubscriptionDetail[]=[];
  temp : SubscriptionDetail[] = [];
  bookName:string='';
  query: string='';
  constructor(private subscriptionService: SubscriptionService){
    this.subscriptionService.getAllSubscriptions().subscribe(
      {
        next: (data)=> {
          this.subscriptions=data;
          this.temp = data;
         console.log("Data get all subscriptions:",data);
       },
       error: (err) => {
         console.log(err);
       },
       complete : () => {
         console.log("Server completed sending data")
       }
      }
    );
  }
  getSubscriptionsByBookName(bookName:string){
    this.subscriptionService.getSubscriptionsByBookName(bookName).subscribe(
      {
        next: (data)=> {
          this.subscriptions = this.temp;
          this.subscriptions=data;
         console.log("Data get all books:",data);
       },
       error: (err) => {
         console.log(err);
       },
       complete : () => {
         console.log("Server completed sending data")
       }
      }
    );
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

  getAllSubscriptions() {
    this.subscriptionService.getAllSubscriptions().subscribe(
      {
        next: (data)=> {
          this.subscriptions=data;
          this.temp = data;
         console.log("Data get all subscriptions:",data);
       },
       error: (err) => {
         console.log(err);
       },
       complete : () => {
         console.log("Server completed sending data")
       }
      }
    );
  }

}
