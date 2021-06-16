import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal  from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FormComponent implements OnInit {

  private title:string[] = ['Creating Category', 'Editing Category'];
  private category = new Category();
  constructor(private categoryService: CategoryService, private myRouter: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  public loadCategory(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.categoryService.getCategory(id).subscribe((category) => this.category = category)
      }
    })
  }
  public getTitle(idx:number): string{
    return this.title[idx];
  }
  public getCategory(): Category{
    return this.category;
  }
  public createCategory(): void{
    this.categoryService.createCategory(this.category).subscribe(
      (category) => {
        this.myRouter.navigate(['/categories'])
        Swal.fire('New Category',`Category ${category.categoryName}, created successfully`,'success')
      }
    );
  }
  public updateCategory(): void{
    this.categoryService.updateCategory(this.category).subscribe(
      (category) => {
        this.myRouter.navigate(['/categories'])
        Swal.fire('Updated Category', `Category ${category.categoryName}, updated successfully`, 'success')
      }
    )
  }
}
