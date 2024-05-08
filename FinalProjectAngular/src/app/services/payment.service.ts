import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  createTransaction(payment:Payment) : Observable<any> {
    return this.httpClient.post("http://localhost:8080/payment/buy",payment);
  }

  createTransactionForSubscription(subscriptionId?:number)
  {
    return this.httpClient.post("http://localhost:8080/payment/subscribe",subscriptionId);
  }


  
}
