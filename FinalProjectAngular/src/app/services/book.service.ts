import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { CartDto } from '../models/cart-dto';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient) { }
    getAllBooks():Observable<any>
    {
      return this.httpClient.get("http://localhost:8080/user/allbooks");
    }
    getMyOrders(userId?:number):Observable<any>{
      return this.httpClient.get("http://localhost:8080/user/orders/"+userId);
    }
    addToCart(cartDto:CartDto):Observable<any>{
      return this.httpClient.post("http://localhost:8080/book/cart",cartDto);
    }  
    buyNow(cartDto:CartDto):Observable<any>{
      return this.httpClient.post("http://localhost:8080/book/buy",cartDto);
    }   

    getBookByCategory(category : string): Observable<any> {
      console.log(category);
      return this.httpClient.get("http://localhost:8080/user/books/category/" + category);
    }
}
