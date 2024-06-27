import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
const httpOptions = {
  headers : new HttpHeaders({"Content-Type" : "application/json"}),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private token : string = "";
  private name: string = "";

  getToken(){
    return this.token;
  }
  constructor(private http: HttpClient) { }

  addUsers(aUser: any){
    return this.http.post("/signup", aUser, httpOptions);
  }

  loginUsers(email: any, password: any){
    const authData = {email: email, password: password}
    return this.http.post<{token:string}>("/signin",authData , httpOptions)
    .subscribe(res => {
        this.token = res.token;
        console.log(this.token);
    })
  }

  getUser(){
    return this.http.get("/user")
  }

  addCategory(aCategory: any){
    return this.http.post("/add-category", aCategory, httpOptions)
  }

  getCategory(){
    return this.http.get("/list-categories")
  }

  deleteCategory(id : string){
    let url = "/delete-categories/" + id;
    return this.http.delete(url, httpOptions)
  }

  updateCategory(categoryID : string, obj: any){
    return this.http.put("/update-category",  obj, httpOptions)
  }

  displayCategory(id : string){
    let url = "/display-category/" + id;
    return this.http.get(url,httpOptions)
  }

  displayStats(){
    return this.http.get("/stats-g1");
  }
}
