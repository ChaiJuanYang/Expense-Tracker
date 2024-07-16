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
  percentageResult: { category: any; percentage: any }[] = [];
  userId: string = '';
  expenseBreakdown : any;
  sampleReturnObject : any= [{
    expense: [ { _id: null, total: 13978.9 } ],
    expensesBreakdown: [
      { total: 12000, category: 'Housing & Loans' },
      { total: 26, category: 'Entertainment' },
      { total: 180, category: 'Education' },
      { total: 1000, category: 'Insurance' },
      { total: 78, category: 'Utilities' },
      { total: 678.9, category: 'Fashion' },
      { total: 16, category: 'Food & Beverage' }
    ]
  }];

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
    this.dbService.displayExpense(this.userId, this.month, this.year).subscribe((retObj: any) => {
      console.log("Retured Object: ", retObj)
      if (retObj.expense && retObj.expense.length > 0) {
        // console.log("Retured Object: ", retObj)
        this.totalExpense = retObj.expense[0].total;
        this.expenseBreakdown = retObj.expensesBreakdown;
        console.log("Expense Breakdown: ", this.expenseBreakdown);
        this.calculatePercentage();
      } else {
        this.totalExpense = 0;
        this.expenseBreakdown = this.sampleReturnObject.expensesBreakdown;
      }
    });
  }

  onMonthChange() {
    this.calculateTotalExpense();
  }

  onYearChange() {
    this.calculateTotalExpense();
  }

  calculatePercentage(){
    let percentage = 0;
    // const result = [];
    for(let i=0; i<this.expenseBreakdown.length; i++){
      percentage = (this.expenseBreakdown[i].total / this.totalExpense) * 100;
      this.percentageResult.push({category: this.expenseBreakdown[i].category, percentage: percentage.toFixed(2)});
    }
    console.log("Percentage Result: ", this.percentageResult)
  }

  getPercentage(category: any) {
    let percentage = 0;
    for(let i=0; i<this.percentageResult.length; i++){
      if(this.percentageResult[i].category === category){
        percentage = this.percentageResult[i].percentage;
        break;
      }
    }
    return percentage;
  }
}
