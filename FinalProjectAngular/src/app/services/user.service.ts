import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  userSignIn(user: User) : Observable<any> {
    return this.httpClient.post("http://localhost:8080/user/signup" , user);
  }

  userProfile(id : number): Observable<any> {
    return this.httpClient.get("http://localhost:8080/user/profile/" + id);
  }

  editProfile(user: User) : Observable<any>  {
    return this.httpClient.patch("http://localhost:8080/user/profile" , user);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get("http://localhost:8080/user/profile/" + id);
  }
}
