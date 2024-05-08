import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AdminCrudService } from '../../services/admin-crud.service';
import { BookStock } from '../../models/book-stock';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchBookStockPipe } from '../../pipes/search-book-stock.pipe';
import { BookOrders } from '../../models/book-orders';
import { Order } from '../../models/order';

@Component({
  selector: 'app-crud-book',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBookStockPipe],
  templateUrl: './crud-book.component.html',
  styleUrl: './crud-book.component.css'
})
export class CrudBookComponent {
  orders:Order[]=[];
  bookStockArr: BookStock[] = [];
  temp:BookStock[]=[];
  bookStock : BookStock;
  errorMessage:string="";
  query : string="";
  adminId=sessionStorage.getItem("adminId");
  constructor(private adminService: AdminCrudService,private matDialog: MatDialog,private router: Router, private bookService : BookService) {
    this.bookStock = new BookStock();
    this.bookStock.book = new Book();
    this.adminService.getAllBooks().subscribe(
      {
        next: (data)=> {
          this.bookStockArr=data;
          this.temp=data;
         console.log("Data get all books:",data);
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
    )
  }

  deleteBook(bookId?: number) {
    if(confirm("Do you want to delete this book? "))
    this.adminService.deleteBook(bookId).subscribe(
      {
        next: (data)=> {
          this.bookStockArr = this.bookStockArr.filter((a) => a.bookStockId!= bookId);
          console.log("deleted:",data);
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
    )
  }

  updateBook(bookStock: BookStock) {
    console.log("book to update" + bookStock);
    this.router.navigateByUrl("update-book/" + bookStock.bookStockId);
  }
  
  searchByCategory(category : string ) {
    
    this.bookService.getBookByCategory(category).subscribe(
      {
        next: (data)=> {
        this.bookStockArr=this.temp;
        this.bookStockArr= this.bookStockArr.filter((a) => a.book.bookCategory == category);
         console.log("Get book by category:",data);
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

  getAllBooks() {
    this.adminService.getAllBooks().subscribe(
      {
        next: (data)=> {
          this.bookStockArr=data;
         console.log("Data get all books:",data);
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
