import { inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
 let user = sessionStorage.getItem("role");
 let id = sessionStorage.getItem("userId");
 let userObj;
 let idObj;

 if (user != null && id != null) {
   
   console.log(userObj);
   if (user == "user" && id != null)
     return true
 }
 //needs-login
 alert("Kindly login to access");
 inject(Router).navigateByUrl("login");
 return false;
};


