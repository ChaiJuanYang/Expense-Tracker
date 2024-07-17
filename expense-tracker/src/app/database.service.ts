import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
const httpOptions = {
  headers : new HttpHeaders({"Content-Type" : "application/json"}),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
 
  getAuthStatusListener() {
    throw new Error('Method not implemented.');
  }
  private token : string = "";
  private authenticatedSub = new Subject<boolean>();
  private userSubject = new BehaviorSubject<any>(null);
  private isAuthenticated: boolean = false;
  private logoutTimer: any;

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getAuthenticatedSub(){
    return this.authenticatedSub.asObservable();
  }
  getToken(){
    return this.token;
  }

  getUser(){
    return this.userSubject.asObservable();
  }
  
  constructor(private http: HttpClient, private router:Router) { }

  addUsers(aUser: any){
    return this.http.post("/signup", aUser, httpOptions);
  }

  loginUsers(email: any, password: any){
    const authData = {email: email, password: password}
    return this.http.post<{token:string , user:any, expiresIn:number}>("/signin",authData , httpOptions)
    .subscribe(res => {
        this.token = res.token;
        this.userSubject.next(res.user); // Update the user subject
        console.log(this.token);
        console.log(res.user);
        if(this.token){
          this.authenticatedSub.next(true);
          this.isAuthenticated = true;
          this.router.navigate(['/dashboard']);
          this.logoutTimer = setTimeout(() => {this.logoutUser()}, res.expiresIn * 1000); // convert seconds to milliseconds
        }
    })
  }

  logoutUser(){
    this.token = "";
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/signin']);
    clearTimeout(this.logoutTimer);
  }

  addExpense(aExpense: any){
    return this.http.post("/add-expense", aExpense, httpOptions)
  }

  getExpenses(userId: string){
    return this.http.post("/view-expenses",{userId} , httpOptions)
  }
  
  deleteExpense(id : string){
    return this.http.delete("/delete-expense/" + id, httpOptions)
  }

  updateExpense(expenseObj: any){
    return this.http.put("/edit-expense",  expenseObj, httpOptions)
  }

  displayExpense(userId : string, month: number, year: string){
    return this.http.post("/dashboard",{userId, month, year},httpOptions)
  }
  
}
