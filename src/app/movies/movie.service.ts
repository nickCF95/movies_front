import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Movie } from './movie';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlEndPoint:string = 'https://immense-headland-18507.herokuapp.com/api/movies';
  //private urlEndPoint:string = 'http://localhost:3001/api/movies';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private myRouter: Router) { }

  public getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.urlEndPoint)
  }

  public createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.urlEndPoint, movie, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error when creating movie', e.error.error, 'error');
        return throwError(e);
      }));
  }

  public getMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.myRouter.navigate(['/movies']);
        swal.fire('Error when editing movie', e.error.error, 'error');
        return throwError(e);
      }));      
  }
  public updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.urlEndPoint}/${movie.id}`, movie, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error when editing movie', e.error.error, 'error');
        return throwError(e);
      }));;
  }
  public deleteMovie(id: string): Observable<Movie>{
    return this.http.delete<Movie>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.myRouter.navigate(['/movies']);
        swal.fire('Error when removing category', e.error.error, 'error');
        return throwError(e);
      }));
  }
}
