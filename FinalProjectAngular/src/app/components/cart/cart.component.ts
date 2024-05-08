import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { BookDetail } from '../../models/book-detail';
import { BookDto } from '../../models/book-dto';
import { ListDto } from '../../models/list-dto';
import { Router } from '@angular/router';
import { CartDto } from '../../models/cart-dto';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  bookDetails:BookDetail[]=[];
  errorMessage:string="";
  userId=sessionStorage.getItem("userId");
  id=0;
  cost: number= 0;
  booksId:number[]=[];
constructor(private cartService:CartService,
  private router: Router){
    
  
  if(this.userId!=undefined){
    this.id=parseInt(this.userId,10);
  this.cartService.getCart(this.id).subscribe(
    {
      next: (data)=> {
        this.bookDetails=data;
        console.log("Cart:",data);
        for(let i=0; i<this.bookDetails.length; i++){
          let id=this.bookDetails[i].book?.bookId;
          if(id!=undefined) this.booksId[i]=id;
        }
        this.cost = this.bookDetails.reduce((total, bd) => total + ((bd.book?.price || 0) * (bd.quantity || 0)), 0);
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
  else alert("UserId undefined..User may not be logged in");
}
increaseQuantity(bookId?:number){
  // const id = this.userIdService.getUserId();
  if(this.userId!=undefined){
    this.id=parseInt(this.userId,10);
  if(bookId==undefined || bookId<=0){
    alert("BookId is invalid or negative");
  }
  else{
  let bookDto:BookDto=new BookDto(this.id,bookId);
  
  this.cartService.increaseQuantity(bookDto).subscribe(
    {
      next: (data)=> {
        this.bookDetails=data; //to automatically reload the books in cart by reassinging the changes
        this.cost = this.bookDetails.reduce((total, bd) => total + ((bd.book?.price || 0) * (bd.quantity || 0)), 0);
        console.log("Cart:",data);
      },
      error: (err) => {
        console.log(err);
         if (err.status == "0")
              this.errorMessage = " Network error, please try again later."
         else
              alert(err.error);
      },
      complete : () => {
        console.log("Patch done");
      }
    }
  );
  }
  }
  else alert("UserId undefined..User may not be logged in");
}
decreaseQuantity(bookId?:number){
  if(this.userId!=undefined){
    this.id=parseInt(this.userId,10);
  }
  let bookDto:BookDto=new BookDto(this.id,bookId);
  this.cartService.decreaseQuantity(bookDto).subscribe(
    {
      next: (data)=> {
        this.bookDetails=data;
        this.cost = this.bookDetails.reduce((total, bd) => total + ((bd.book?.price || 0) * (bd.quantity || 0)), 0);
        console.log("Cart:",data);
      },
      error: (err) => {
        console.log(err);
        if (err.status == "0")
          this.errorMessage = " Network error, please try again later."
        else
          alert(err.error);
      },
      complete : () => {
        console.log("Patch done");
      }
    }
  );
}
deleteFromCart(bookId?:number){
  if(confirm('Do you want to delete this from cart?')){
this.cartService.deleteFromCart(this.id,bookId).subscribe(
    {
      next: (data)=> {
        this.bookDetails=data;
        console.log("Cart:",data);
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
);}
}

buyAll(cost: number){
  if(this.userId!=undefined){
    this.id=parseInt(this.userId,10);
    let listDto:ListDto=new ListDto(this.id,this.booksId);
    // let costDto:CostDto=new CostDto(cost,listDto);
  sessionStorage.setItem("cost",cost.toString());
  this.cartService.buyAll(listDto).subscribe(
    {
      next: (data)=> {
        console.log("Order:",data);
        this.router.navigateByUrl("buybook");
        
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
  );
}
}



// buyFromCart()
// {
//   this.router.navigateByUrl("buyBooks");

//     // this.productService.getProductDetails(false, 0).subscribe(
//     //   (resp) => {
//     //     console.log(resp);
//     //   }, (err) => {
//     //     console.log(err);
//     //   }
//     // );
  
// }

}




