import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { AdminCrudService } from '../../services/admin-crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookDetail } from '../../models/book-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-order-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-order-status.component.html',
  styleUrl: './update-order-status.component.css'
})
export class UpdateOrderStatusComponent {
  orders:Order[]=[];
  constructor(private adminService : AdminCrudService, private router: Router) {
    this.adminService.updateOrderStatus().subscribe(
      {
        next: (data)=> {
          this.orders = data;
         console.log("Data get all books:",this.orders);
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
  viewDetails(books?:BookDetail[]) {
    localStorage.setItem("order",JSON.stringify(books));
    this.router.navigateByUrl("order/books");
  }
}
