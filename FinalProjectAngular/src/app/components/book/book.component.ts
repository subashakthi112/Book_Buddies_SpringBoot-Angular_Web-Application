import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchBookPipe } from '../../pipes/search-book.pipe';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,FormsModule, SearchBookPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
    books:Book[]=[];
    book: Book;
    temp:Book[]=[];
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
    

     searchByCategory(category : string ) {
      this.bookService.getBookByCategory(category).subscribe(
        {
          next: (data)=> {
            this.temp=this.books;
            this.books = this.books.filter((a) => a.bookCategory == category);

           console.log("Get book by category:",this.temp);
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
    viewBook(book:Book){
      sessionStorage.setItem("book",JSON.stringify(book));
      this.router.navigateByUrl("viewbook");
    }
}
