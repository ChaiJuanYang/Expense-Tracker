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
  errorMessage: string = "";
  constructor(private dbService :DatabaseService, private router :Router) { }
  newSignUp() {
    if (this.password !== this.repeatpassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    let userObj = {
      name: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender,
      contactNumber: this.contactNumber
    };

    console.log(userObj);

    this.dbService.addUsers(userObj).subscribe({
      next: (result) => {
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.errorMessage = error.error.message || "An error occurred. Please try again.";
        console.log(error);
      }
    });
  }

  toSignIn(){
    this.router.navigate(['/signin']);
  }
}
