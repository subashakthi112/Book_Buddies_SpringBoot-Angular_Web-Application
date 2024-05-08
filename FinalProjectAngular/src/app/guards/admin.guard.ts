import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let user = sessionStorage.getItem("role");
 let id = sessionStorage.getItem("adminId");
 let userObj;
 let idObj;

 if (user != null && id != null) {
   
   console.log(userObj);
   if (user == "admin" && id != null)
     return true
 }
 //needs-login
 alert("Kindly login as Admin to access");
 inject(Router).navigateByUrl("login");
 return false;
};

