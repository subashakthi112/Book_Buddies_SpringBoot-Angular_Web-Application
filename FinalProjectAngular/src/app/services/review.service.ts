import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private httpClient: HttpClient){}

  addReview(reviewDto?:Review):Observable<any>{
    return this.httpClient.post("http://localhost:8080/review", reviewDto);
  }

  updatereview(review :Review):Observable<any>{
    console.log(review);
    return this.httpClient.put("http://localhost:8080/review",review);
  }

  getReviewById(id: string) : Observable<any> {
    return this.httpClient.get("http://localhost:8080/review/" + id);
  }

  deleteReviewbyId(id: number | undefined) : Observable<any> {
    return this.httpClient.delete("http://localhost:8080/review/" + id);
  }
  
  }


