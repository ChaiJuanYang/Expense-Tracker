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

const routes: Routes = [
    {path: '',
    component: DashboardComponent,
    children: [
        {path: 'home', component: HomeComponent},
        {path: 'add-expense', component: AddExpenseComponent},
        {path: 'view-expenses', component: ViewExpensesComponent},
        {path: 'edit-expense', component: EditExpenseComponent},
        {path: 'remove-expense', component: RemoveExpenseComponent}
    ]}
];

@NgModule({
    declarations: [AddExpenseComponent, ViewExpensesComponent, EditExpenseComponent, RemoveExpenseComponent],
    imports: [RouterModule.forChild(routes), FormsModule, HttpClientModule, BrowserModule, CommonModule],
    exports: [RouterModule],    
    providers: [DatabaseService]
  })
  export class DashboardRoutingModule { }