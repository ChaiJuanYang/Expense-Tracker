import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit{

  userId: string = "";
  amount: number = 0;
  date: string = "";
  category: string = "";
  description: string = "";
  categories : string[] = ['Housing & Loans','Food & Beverage','Fashion','Household','Transportation','Utilities','Insurance','Healthcare','Education','Entertainment','Others']
  paymentMethod: string = ""; 
  paymentMethods : string[] = ['Cash','Credit Card','Debit Card','UPI','Net Banking','Others']
  constructor(private router :Router, private dbService : DatabaseService) { }
  ngOnInit(): void {
    this.getUser();
  }

  submitExpense() {
    let expenseObj = {
      userId: this.userId,
      amount: this.amount,
      date: this.date,
      category: this.category,
      description: this.description,
      paymentMethods: this.paymentMethod
    };
    console.log(expenseObj);
    this.dbService.addExpense(expenseObj).subscribe({
      next: (result) => {this.router.navigate(["/dashboard"]);
      },
      error: (error) => {this.router.navigate(["/invalid-data"]);
      }
    })
      // throw new Error('Method not implemented.');
  }

  getUser(){
    this.dbService.getUser().subscribe(user => {
      if(user){
        console.log(user);
        this.userId = user._id;
      }
    })
  }
}
