import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal  from 'sweetalert2'
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FormComponentMovie implements OnInit {

  private title:string[] = ['Creating Movie','Editing Movie'];
  private movie = new Movie();
  public categories: Category[] = [];
  constructor(private movieService: MovieService, private myRouter: Router, private activatedRoute: ActivatedRoute, private categoryService : CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
    this.loadMovie();
  }

  public loadMovie(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      console.log(id)
      if(id){
        this.movieService.getMovie(id).subscribe((movie) => this.movie = movie)
      }
    })
  }
  public getTitle(idx:number):string{
    return this.title[idx]
  }
  public getMovie(): Movie{
    return this.movie;
  }
  public createMovie(): void{
    this.movieService.createMovie(this.movie).subscribe(
      (movie) => {
        this.myRouter.navigate(['/movies'])
        Swal.fire('New Movie',`Movie ${movie.name}, created successfully`,'success')
      }
    );
  }
  public updateMovie(): void{
    this.movieService.updateMovie(this.movie).subscribe(
      (movie) => {
        this.myRouter.navigate(['/movies'])
        Swal.fire('Updated Movie', `Movie ${movie.name}, updated successfully`, 'success')
      }
    )
  }
}
