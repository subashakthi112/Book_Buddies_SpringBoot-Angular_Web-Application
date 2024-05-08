import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CartDto } from '../../models/cart-dto';
import { Router } from '@angular/router';
import { SearchBookPipe } from '../../pipes/search-book.pipe';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,FormsModule, SearchBookPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    books:Book[]=[];
    book: Book;
    quantity=1;
    errorMessage:string="";
    query : string="";
    userId=sessionStorage.getItem("userId");
    id=0;
    constructor(private bookService : BookService, private router:Router){
      this.book = new Book();
       this.bookService.getAllBooks().subscribe(
       {
         next: (data)=> {
            this.books=data;
           console.log("Data:",data);
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
     addBookToCart(bookId?:number){
      if(this.userId!=undefined){
        this.id=parseInt(this.userId,10);
      }
      if(bookId==undefined || bookId<=0){
        alert("BookId is invalid or negative");
      }
      else {
        if(this.quantity==undefined|| this.quantity<=0){
          alert("Quantity is invalid or negative");
        }
      else{
        let cartDto:CartDto=new CartDto(this.id,bookId,this.quantity);
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
     }
    }
     buyNow(bookId?:number){
      if(this.userId!=undefined){
        this.id=parseInt(this.userId,10);
      }
      if(bookId==null || bookId<=0) alert("BookId is null or invalid");
      if(this.quantity==null || this.quantity<=0) alert("Quantity is null or negative");
      let cartDto:CartDto=new CartDto(this.id,bookId,this.quantity);
      this.bookService.buyNow(cartDto).subscribe(
        {
          next: (data)=> {
           console.log("Orders:",data);
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

     searchByCategory(category : string ) {
      this.bookService.getBookByCategory(category).subscribe(
        {
          next: (data)=> {
            this.books = this.books.filter((a) => a.bookCategory == category);
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
      this.bookService.getAllBooks().subscribe(
        {
          next: (data)=> {
            this.books=data;
           console.log("Data:",data);
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
