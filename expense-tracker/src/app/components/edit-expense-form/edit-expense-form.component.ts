import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';

@Component({
  selector: 'app-edit-expense-form',
  templateUrl: './edit-expense-form.component.html',
  styleUrls: ['./edit-expense-form.component.css']
})
export class EditExpenseFormComponent {
  date: string = '';
  amount: number = 0;
  category: string = '';
  description: string = '';
  paymentMethod: string = '';
  expense: any;
  categories : string[] = ['Housing & Loans','Food & Beverage','Fashion','Household','Transportation','Utilities','Insurance','Healthcare','Education','Entertainment','Others'];
  paymentMethods : string[] = ['Cash','Credit Card','Debit Card','UPI','Net Banking','Others']

  constructor(
    public dialogRef: MatDialogRef<EditExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditExpenseComponent
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log("This.data: ",this.data)
    this.dialogRef.close(this.data);
  }
}
