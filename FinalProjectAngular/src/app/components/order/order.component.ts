import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { BookDetail } from '../../models/book-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  // userId:number=1;
  userId=sessionStorage.getItem("userId");
  id=0;
  orders:Order[]=[];
  errorMessage:string="";
constructor(private bookService:BookService,private router: Router){
  if(this.userId!=undefined){
    this.id=parseInt(this.userId,10);
  }
this.bookService.getMyOrders(this.id).subscribe({
  next: (data)=> {
     this.orders=data;
    console.log("Orders:",data);
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
);

}
viewDetails(books?:BookDetail[]){
  localStorage.setItem("order",JSON.stringify(books));
  this.router.navigateByUrl("order/books");
}
}
