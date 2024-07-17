import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './database.service';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DatabaseInterceptor } from './database-interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RouteGuard } from './route-guard';
// import { DashboardRoutingModule } from './dashboard.routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TotalExpenseComponent } from './components/total-expense/total-expense.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ViewExpensesComponent } from './components/view-expenses/view-expenses.component';
import { RemoveExpenseComponent } from './components/remove-expense/remove-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { EditExpenseFormComponent } from './components/edit-expense-form/edit-expense-form.component';
import { BudgetPlannerComponent } from './components/budget-planner/budget-planner.component';

const routes: Routes = [  
  {path :"signin", component: SigninComponent},
  {path :"signup", component: SignupComponent},
  {path: "", redirectTo: "home", pathMatch: "full" },
  {path: '',
    component: DashboardComponent,
    canActivate: [RouteGuard],
    children: [
        {path: 'dashboard', component: TotalExpenseComponent, canActivate: [RouteGuard]},
        {path: 'add-expense', component: AddExpenseComponent, canActivate: [RouteGuard]},
        {path: 'view-expenses', component: ViewExpensesComponent, canActivate: [RouteGuard]},
        {path: 'edit-expense', component: EditExpenseComponent, canActivate: [RouteGuard]},
        {path: 'remove-expense', component: RemoveExpenseComponent, canActivate: [RouteGuard]},
        {path: 'budget-planner', component: BudgetPlannerComponent, canActivate: [RouteGuard]}
    ]},
  {path :"home", component: HomeComponent},
  {path :"user", component: UserComponent},
  {path :"invalid-data", component: InvalidDataComponent},
  
  {path :"**", component: PageNotFoundComponent},
  ]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    InvalidDataComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    TotalExpenseComponent,
    AddExpenseComponent,
    ViewExpensesComponent,
    RemoveExpenseComponent,
    EditExpenseComponent,
    EditExpenseFormComponent,
    RemoveExpenseComponent,
    BudgetPlannerComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, { useHash: true }), HttpClientModule, CommonModule,FormsModule,
    // DashboardRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}), NoopAnimationsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule],
    
  providers: [DatabaseService, {provide: HTTP_INTERCEPTORS, useClass: DatabaseInterceptor, multi: true},RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
