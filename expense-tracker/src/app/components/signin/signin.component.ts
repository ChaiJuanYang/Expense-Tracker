import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email : string = "";
  password : string = "";
  constructor(private router : Router) { }
  onSignIn() {
  throw new Error('Method not implemented.');
  }
  newSignUp() {
    this.router.navigate(['/signup']);
  }

}
