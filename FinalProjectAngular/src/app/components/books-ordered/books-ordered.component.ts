import { Component } from '@angular/core';
import { BookDetail } from '../../models/book-detail';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-ordered',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-ordered.component.html',
  styleUrl: './books-ordered.component.css'
})
export class BooksOrderedComponent {
  user : string | null = "";
  bookDetails:BookDetail[]=[];
 
  constructor(private router: Router){
     this.user = sessionStorage.getItem("role");
    let bookQuantity=localStorage.getItem('order');
    if(bookQuantity!=undefined){
      this.bookDetails=JSON.parse(bookQuantity);
  }
}

addReview(bookId: number| undefined) {
    this.router.navigateByUrl("add-review/" + bookId );
}
}
