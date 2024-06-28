import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DatabaseService } from "./database.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RouteGuard implements CanActivate{
    constructor(private dbService : DatabaseService, private route : Router){}
    canActivate(route : ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean | UrlTree | Observable < boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuthenticated = this.dbService.getIsAuthenticated();
        if(!isAuthenticated){
            this.route.navigate(['/signin']);
        } 
        return isAuthenticated;
    }
   
}