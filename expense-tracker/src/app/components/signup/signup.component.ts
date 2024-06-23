import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name : string = "";
  email : string = "";
  password : string = "";
  repeatpassword : string = "";
  gender : string = "";
  contactNumber : string = "";
  genders : string[] = ['Male','Female','Others']
  title: string = "Expense Tracker";
  constructor(private dbService :DatabaseService, private router :Router) { }
  newSignUp() {
  
    let userObj = {
      name : this.name,
      email : this.email,
      password : this.password,
      gender : this.gender,
      contactNumber : this.contactNumber
  };
  console.log(userObj);
  this.dbService.addUsers(userObj).subscribe({
    next: (result) => {this.router.navigate(['/signin'])},
    error: (error) => {console.log(error)}
  })
}
}
