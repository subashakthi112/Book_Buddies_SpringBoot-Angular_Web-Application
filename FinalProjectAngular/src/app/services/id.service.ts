import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  userId!: number;

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }

  adminId!: number;

  setAdminId(id: number) {
    this.adminId = id;
  }

  getAdminId(): number {
    return this.adminId;
  }
}
