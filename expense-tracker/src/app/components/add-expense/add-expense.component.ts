import { Component } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
submitExpense() {
throw new Error('Method not implemented.');
}

    amount: number = 0;
    date: string = "";
    category: string = "";
    description: string = "";
    categories : string[] = ['Housing & Loans','Food & Beverage','Fashion','Household','Transportation','Utilities','Insurance','Healthcare','Education','Entertainment','Others']
}
