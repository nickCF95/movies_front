import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];
  public page:number | undefined;
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }
  public deleteCategory(category: Category): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert the delete of ${category.categoryName} category!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id).subscribe(
          () => {                        
            this.categories = this.categories.filter(cat => cat !== category)
            swalWithBootstrapButtons.fire(
              'Category Deleted!',
              `Your Category:${category.categoryName} has been deleted.`,
              'success'
            )
          }
        )        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          `Your Category:${category.categoryName} is safe`,
          'error'
        )
      }
    })
  }

}
