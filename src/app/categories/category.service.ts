import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Category } from './category';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private urlEndPoint:string = 'https://immense-headland-18507.herokuapp.com/api/categories';
  private urlEndPoint:string = 'http://localhost:3001/api/categories';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private myRouter: Router) { }

  public getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.urlEndPoint)
  }

  public createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.urlEndPoint, category, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error when creating category', e.error.error, 'error');
        return throwError(e);
      }));
  }

  public getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.myRouter.navigate(['/categories']);
        swal.fire('Error when editing category', e.error.error, 'error');
        return throwError(e);
      }))              
  }
  public updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.urlEndPoint}/${category.id}`, category, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error when editing category', e.error.error, 'error');
        return throwError(e);
      }));
  }
  public deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.myRouter.navigate(['/categories']);
        swal.fire('Error when removing category', e.error.error, 'error');
        return throwError(e);
      }));
  }
}
