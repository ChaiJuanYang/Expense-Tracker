import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
    username : string = "";
    user : any
    email : string = "";
    constructor(private dbService : DatabaseService) { }
    ngOnInit(): void {
      // this.getUser();
    }
}
