import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookStock } from '../../models/book-stock';
import { AdminCrudService } from '../../services/admin-crud.service';

@Component({
  selector: 'app-less-stock-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './less-stock-display.component.html',
  styleUrl: './less-stock-display.component.css'
})
export class LessStockDisplayComponent {
  bookStockArr: BookStock[] = [];
  constructor(private adminService : AdminCrudService) {
    this.adminService.displayLessStocks().subscribe(
      {
        next: (data)=> {
          this.bookStockArr = data;
         console.log("Data get all books:",this.bookStockArr);
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
