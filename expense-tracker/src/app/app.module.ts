import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { DeleteCategoriesComponent } from './components/delete-categories/delete-categories.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './database.service';
import { ListEventCapsPipe } from './pipes/list-event-caps.pipe';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [  
  {path :"signin", component: SigninComponent},
  {path :"signup", component: SignupComponent},
  {path :"add-category", component: AddCategoryComponent},
  {path :"list-categories", component: ListCategoriesComponent},
  {path :"delete-categories", component: DeleteCategoriesComponent},
  {path :"update-category", component: UpdateCategoryComponent},
  {path :"display-category/:categoryId", component: DisplayCategoryComponent},
  {path :"invalid-data", component: InvalidDataComponent},
  {path: "", redirectTo: "/list-categories", pathMatch: "full" },
  {path :"**", component: PageNotFoundComponent},

  ]

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    DeleteCategoriesComponent,
    ListCategoriesComponent,
    FooterComponent,
    PageNotFoundComponent,
    UpdateCategoryComponent,
    ListEventCapsPipe,
    DisplayCategoryComponent,
    InvalidDataComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, { useHash: true }), HttpClientModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
    
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
