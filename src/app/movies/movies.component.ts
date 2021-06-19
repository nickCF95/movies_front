import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] = [];
  public page:number | undefined;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
      }
    );
  }

  public findIdxMovie(id: string): number{
    return this.movies.findIndex(movie => movie.id === id);
  }
  public deleteMovie(movie: Movie): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert the delete of ${movie.name} category!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.movieService.deleteMovie(movie.id).subscribe(
          () => {                        
            this.movies = this.movies.filter(mov => mov !== movie)
            swalWithBootstrapButtons.fire(
              'Category Deleted!',
              `Your Category:${movie.name} has been deleted.`,
              'success'
            )
          }
        )        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          `Your Category:${movie.name} is safe`,
          'error'
        )
      }
    })
  }

}
