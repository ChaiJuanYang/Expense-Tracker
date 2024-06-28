// // import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
// // import { Observable } from "rxjs";
// // import { DatabaseService } from "./database.service";
// // import { Injectable, inject } from "@angular/core";

// // @Injectable()
// // class RouteGuard {
// //     constructor(private dbService : DatabaseService, private route : Router){}
// //     canActivate(
// //         route : ActivatedRouteSnapshot , 
// //         state: RouterStateSnapshot) : boolean {
        
// //         const isAuthenticated = this.dbService.getIsAuthenticated();
// //         console.log('isAuthenticated:', isAuthenticated)
// //         if(!isAuthenticated){
// //             this.route.navigate(['/home']);
// //         } 
// //         return isAuthenticated;
// //     }
// // }
// //     export const IsRouteGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {;
// //     return inject(RouteGuard).canActivate(route, state);

// import { inject } from '@angular/core';
// import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { DatabaseService } from './database.service';

// export const IsRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   const dbService = inject(DatabaseService);
//   const router = inject(Router);
//   const isAuthenticated = dbService.getIsAuthenticated();
//   console.log('isAuthenticated:', isAuthenticated);
//   if (!isAuthenticated) {
//     router.navigate(['/signin']);
//   }
//   return isAuthenticated;
// };

// route-guard.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard {
  constructor(private dbService: DatabaseService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.dbService.getIsAuthenticated();
    console.log('isAuthenticated:', isAuthenticated);
    if (!isAuthenticated) {
      this.route.navigate(['/signin']);
    }
    return isAuthenticated;
  }
}
