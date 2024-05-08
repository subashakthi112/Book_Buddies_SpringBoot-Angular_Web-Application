import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdService } from './id.service';
import { BookStock } from '../models/book-stock';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class AdminCrudService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks() : Observable<any> {
    return this.httpClient.get("http://localhost:8080/stockmanager/books");
  }

  getBookById(bookId? : string | null) : Observable<any> {
    return this.httpClient.get("http://localhost:8080/stockmanager/book/" + bookId);
  }

  addBook(bookStock? : BookStock) : Observable<any> {
    return this.httpClient.post("http://localhost:8080/stockmanager/book", bookStock);
  }

  updateBook(bookStock? : BookStock): Observable<any> {
    return this.httpClient.patch("http://localhost:8080/stockmanager/book", bookStock);
  }

  deleteBook(bookId?: number): Observable<any> {
    return this.httpClient.delete("http://localhost:8080/stockmanager/book/" + bookId);
  }
  
  updateOrderStatus(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/stockmanager/update-orders");
  }

  displayLessStocks(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/stockmanager/less-stocks");
  }
}
