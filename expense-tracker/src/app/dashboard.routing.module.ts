import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewExpensesComponent } from './components/view-expenses/view-expenses.component';
import { CommonModule } from '@angular/common';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { RemoveExpenseComponent } from './components/remove-expense/remove-expense.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { EditExpenseFormComponent } from './components/edit-expense-form/edit-expense-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TotalExpenseComponent } from './components/total-expense/total-expense.component';

const routes: Routes = [
    {path: '',
    component: DashboardComponent,
    children: [
        {path: 'dashboard', component: TotalExpenseComponent},
        {path: 'home', component: HomeComponent},
        {path: 'add-expense', component: AddExpenseComponent},
        {path: 'view-expenses', component: ViewExpensesComponent},
        {path: 'edit-expense', component: EditExpenseComponent},
        {path: 'remove-expense', component: RemoveExpenseComponent}
    ]}
];

@NgModule({
    declarations: [AddExpenseComponent, ViewExpensesComponent, EditExpenseComponent, RemoveExpenseComponent, EditExpenseFormComponent, TotalExpenseComponent],
    imports: [RouterModule.forChild(routes), FormsModule, HttpClientModule, BrowserModule, CommonModule,
         MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule],
    exports: [RouterModule],    
    providers: [DatabaseService]
  })
  export class DashboardRoutingModule { }