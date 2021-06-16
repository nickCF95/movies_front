import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlEndPoint:string = 'https://immense-headland-18507.herokuapp.com/api/categories';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.urlEndPoint)
  }

  public createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.urlEndPoint, category, {headers:this.httpHeaders});
  }

  public getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`${this.urlEndPoint}/${id}`)        
  }
  public updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.urlEndPoint}/${category.id}`, category, {headers:this.httpHeaders});
  }
  public deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
