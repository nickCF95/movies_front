import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlEndPoint:string = 'http://localhost:3001/api/movies';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.urlEndPoint)
  }

  public createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.urlEndPoint, movie, {headers:this.httpHeaders});
  }

  public getMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(`${this.urlEndPoint}/${id}`)        
  }
  public updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.urlEndPoint}/${movie.id}`, movie, {headers:this.httpHeaders});
  }
  public deleteMovie(id: string): Observable<Movie>{
    return this.http.delete<Movie>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
