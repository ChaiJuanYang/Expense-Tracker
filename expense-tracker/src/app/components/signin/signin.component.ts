import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private dbService: DatabaseService) {}

  onSignIn() {
    this.dbService.loginUsers(this.email, this.password);
    console.log("Logged in")
    this.router.navigate(['/dashboard']);
  }

  newSignUp() {
    this.router.navigate(['/signup']);
  }
}
