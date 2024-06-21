import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'expense-tracker';
  socket : any;

  constructor(private router : Router){
    this.socket = io();
  }
  toLogIn() {
    this.router.navigate(['/signin']);
  }
  toSignUp() {
    this.router.navigate(['/signup']);
  }
}
