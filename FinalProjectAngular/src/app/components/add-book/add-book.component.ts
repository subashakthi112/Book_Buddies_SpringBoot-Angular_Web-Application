import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BookStock } from '../../models/book-stock';
import { AdminCrudService } from '../../services/admin-crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookStock: BookStock;
  errorMessage:string="";

  constructor(private adminService: AdminCrudService, private router : Router) {
    this.bookStock = new BookStock();
    this.bookStock.book = new Book(); // Ensure `book` is initialized to avoid issues in the template
  }

  addBook() {
    if (this.bookStock) {
      this.adminService.addBook(this.bookStock).subscribe({
        next: (data) => {
          this.bookStock = data;
          console.log("Data:", data);
          this.router.navigateByUrl("admincrud");
        },
        error: (err) => {
          console.log(err);
           if (err.status == "0")
              this.errorMessage = " Network error, please try again later."
           else
              alert(err.error);
        },
        complete: () => {
          console.log("Server completed sending data");
        }
      });
    }
  }
}
