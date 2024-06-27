import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
    constructor( private dbService : DatabaseService) { }
    username : string = "";
    ngOnInit(): void {
      this.getUsername();
    }
  
    getUsername() {
      
    }
}
