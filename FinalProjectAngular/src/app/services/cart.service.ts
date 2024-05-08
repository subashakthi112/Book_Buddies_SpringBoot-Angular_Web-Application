import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from '../models/book-dto';
import { ListDto } from '../models/list-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
    getCart(userId?:number):Observable<any>
    {
      return this.httpClient.get("http://localhost:8080/user/cart/" + userId);
    }
    increaseQuantity(bookDto:BookDto):Observable<any>{
        return this.httpClient.patch("http://localhost:8080/cart/book/quantity/plus",bookDto);
    }
    decreaseQuantity(bookDto:BookDto):Observable<any>{
      return this.httpClient.patch("http://localhost:8080/cart/book/quantity/minus",bookDto);
    }
    deleteFromCart(userId?:number,bookId?:number):Observable<any>{
      return this.httpClient.delete("http://localhost:8080/cart/"+userId+"/"+bookId);
    }
    buyAll(listDto:ListDto){
      return this.httpClient.post("http://localhost:8080/cart/buy",listDto);
    }
}
