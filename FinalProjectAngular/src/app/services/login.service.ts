import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/login-dto';
import { Observable } from 'rxjs';
import { IdService } from './id.service';
import { AdminDto } from '../models/admin-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private userIdService: IdService) { }

  userLogin(loginDto: LoginDto): Observable<any> {
    console.log(loginDto);
    return this.httpClient.post("http://localhost:8080/user/login", loginDto);
  }

  adminLogin(adminDto: AdminDto) : Observable<any> {
    console.log(adminDto);
    return this.httpClient.post("http://localhost:8080/stockmanager/login", adminDto);
  }
 
}
