import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'expense-tracker';
  socket : any;

  constructor(private router : Router){
    // this.socket = io();
  }
  toLogIn() {
    this.router.navigate(['/signin']);
  }
  toSignUp() {
    this.router.navigate(['/signup']);
  }
}
