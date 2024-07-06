import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = "Name";
  email: string = "Email";
  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    this.dbService.getUser().subscribe(user => {
      if (user) {
        this.username = user.name;
        this.email = user.email;
      }
    });
  }
}
