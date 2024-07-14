import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { EditExpenseFormComponent } from '../edit-expense-form/edit-expense-form.component';

interface Expense {
  _id: string;
  userId: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  paymentMethod: string;
  __v: number;
}

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  
  expenses: Expense[] = []
  selectedExpense: Expense | null = null;
  userId: string = '';
  example : any[] = [{
    _id: "668cf9a8670552d01c232402",    
    userId: "66785a67cffcbb9ad0167f4b", 
    date: "07-09-2024",
    amount: 70,
    category: 'Food & Beverage',
    description: '',
    paymentMethod : "Debit Card",
    __v: 0
  },{
    _id: "668cf9a8670552d01c232402",    
    userId: "66785a67cffcbb9ad0167f4b", 
    date: "07-09-2024",
    amount: 90,
    category: 'Healthcare',
    description: 'Vitamins for Andrew',
    paymentMethod : "Debit Card",
    __v: 0
  },{
    _id: "668cf9a8670552d01c232402",    
    userId: "66785a67cffcbb9ad0167f4b", 
    date: "07-10-2024",
    amount: 789,
    category: 'Healthcare',
    description: '',
    paymentMethod : "Credit Card",
    __v: 0
  }] // For Testing Purposes
date: any;
amount: any;
category: any;
description: any;
paymentMethod: any;

  constructor(private router : Router, private  dbService : DatabaseService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.dbService.getUser().subscribe(user => {
      if (user) {
        this.userId = user._id;
        console.log(this.userId)
        this.getExpenses();
      }
      else{
        this.expenses = this.example;
        console.log(this.expenses)
      }
    });
  }

  getExpenses() {
    try{
      this.dbService.getExpenses(this.userId).subscribe({
      next: (data: any) => {
        this.expenses = data;
        console.log(this.expenses)
      },
      error: (err: any) => { console.log(err)}
    });
  }catch(err){
    console.log(err)
    }
  }
  
  selectExpense(expense : Expense) {
    this.selectedExpense = expense;
    console.log(this.selectedExpense)
    const dialogRef = this.dialog.open(EditExpenseFormComponent, 
      {width: '400px', data: this.selectedExpense, panelClass: 'custom-dialog-container'});
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("Result: ",result)
        this.saveChanges();
      }
    });
  }

  saveChanges() {
    if(this.selectedExpense){
      this.dbService.updateExpense(this.selectedExpense).subscribe({
        next: (data: any) => {
          this.getExpenses();
          this.selectedExpense = null;
        },
        error: (err: any) => { console.log(err) }
      });
    }
  }

}
