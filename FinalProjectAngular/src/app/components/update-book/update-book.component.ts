import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BookStock } from '../../models/book-stock';
import { AdminCrudService } from '../../services/admin-crud.service';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
  id: string | null = "";
  bookStock: BookStock;
  errorMessage:string="";
  
   constructor(private adminService: AdminCrudService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.bookStock = new BookStock();
    this.bookStock.book = new Book();
   }
  
   ngOnInit(): void {
    this.adminService.getBookById(this.id).subscribe(
      {
        next: (data) => {
          console.log("update - get book by id", data);
          this.bookStock=data;

        },
        error: (err) => {
          console.log(err);
          if (err.status == "0")
          this.errorMessage = " Network error, please try again later."
       else
          alert(err.error);
         
        }
      }
    )
  }
  
  updateBook() {
    console.log(this.bookStock);
    this.adminService.updateBook(this.bookStock).subscribe(
      {
        next: (data)=> {
          this.bookStock=data;
         console.log("updated book:",data);
         this.router.navigateByUrl("admincrud");
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
