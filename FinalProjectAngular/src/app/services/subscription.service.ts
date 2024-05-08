import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionDto } from '../models/subscription-dto';
import { SubscriptionPlan } from '../models/subscription-plan';
import { UpdateSubscriptionDto } from '../models/update-subscription-dto';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient:HttpClient) { }
  subscribeToBook(subscriptionDto:SubscriptionDto):Observable<any>{
    return this.httpClient.post("http://localhost:8080/subscription/subscribe",subscriptionDto);
  }
  getAllSubscriptions(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/subscription/subscriptions");
  }
  getSubscriptionsByBookName(bookName:string):Observable<any>{
    return this.httpClient.get("http://localhost:8080/subscription/subscriptions/book/"+bookName);
  }
  getSubscriptionsByUserId(userId:number):Observable<any>{
    return this.httpClient.get("http://localhost:8080/subscription/subscriptions/user/"+userId);
  }
  renewSubscription(updateSubscriptionDto:UpdateSubscriptionDto):Observable<any>{
    return this.httpClient.patch("http://localhost:8080/subscription/renew",updateSubscriptionDto);
  }
  extendSubscription(updateSubscriptionDto:UpdateSubscriptionDto):Observable<any>{
    return this.httpClient.patch("http://localhost:8080/subscription/extend",updateSubscriptionDto);
  } 
  cancelExpiredSubscriptions():Observable<any>{
    return this.httpClient.patch("http://localhost:8080/subscription/cancelExpired",null);
  }
  
}
