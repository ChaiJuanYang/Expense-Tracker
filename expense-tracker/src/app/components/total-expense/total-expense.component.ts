import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.css']
})
export class TotalExpenseComponent implements OnInit {
  month: number = 0;
  months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 }
  ];
  year: string = "";
  years = ["2021", "2022", "2023", "2024", "2025"];
  totalExpense: any;
  userId: string = '';

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    // Set default values for month and year if not set
    if(this.year === ''){
      this.year = new Date().getFullYear().toString();
    }
    if (this.month === 0){
      this.month = new Date().getMonth() + 1;
    }
    // Get the user ID
    this.getUser();
  }

  getUser() {
    this.dbService.getUser().subscribe(user => {
      if (user) {
        this.userId = user._id;
        console.log("User ID: ", this.userId);
        this.calculateTotalExpense();
      }
    });
  }

  calculateTotalExpense() {
    console.log("Selected Month:", this.month);
    console.log("Year:", this.year);
    this.dbService.displayExpense(this.userId, this.month, this.year).subscribe((expenses: any) => {
      if (expenses && expenses.length > 0) {
        this.totalExpense = expenses[0].total;
      } else {
        this.totalExpense = 0;
      }
    });
  }

  onMonthChange() {
    this.calculateTotalExpense();
  }

  onYearChange() {
    this.calculateTotalExpense();
  }
}
