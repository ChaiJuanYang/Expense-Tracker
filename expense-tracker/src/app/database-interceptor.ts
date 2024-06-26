import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { DatabaseService } from "./database.service";
import { Injectable } from "@angular/core";
@Injectable()
export class DatabaseInterceptor implements HttpInterceptor {

    constructor(private dbService: DatabaseService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.dbService.getToken();
        if (!token){
            return next.handle(req);
        }
        const authReq = req.clone({
            headers: req.headers.set("authorization", token)
        });
        return next.handle(authReq);
    }
};