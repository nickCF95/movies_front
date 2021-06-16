import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { MoviesComponent } from './movies/movies.component';
import { FormComponent } from './categories/form.component';
import { FormComponentMovie } from './movies/form.component';

const routes: Routes = [
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'categories', component:CategoriesComponent},
  {path:'movies', component:MoviesComponent},
  {path:'categories/form', component:FormComponent},
  {path:'categories/form/:id', component:FormComponent},
  {path:'movies/form', component:FormComponentMovie},
  {path:'movies/form/:id', component:FormComponentMovie}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
