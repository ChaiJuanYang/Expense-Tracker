import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title = 'expense-tracker';
  socket : any;
  private authenticationSub!: Subscription;
  userAuthenticated = false;

  constructor(private router : Router, private dbService: DatabaseService){
    // this.socket = io();
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }
  ngOnInit(): void {
    this.authenticationSub = this.dbService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    });
  }

  toLogIn() {
    this.router.navigate(['/signin']);
  }
  toSignUp() {
    this.router.navigate(['/signup']);
  }

  toLogOut() {
    this.dbService.logoutUser();
  }
}
