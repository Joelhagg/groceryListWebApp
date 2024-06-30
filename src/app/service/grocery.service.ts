import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createList(list: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lists`, list, this.getHttpOptions());
  }

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lists`, this.getHttpOptions());
  }

  deleteList(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lists/${id}`, this.getHttpOptions());
  }

  getItems(listId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lists/${listId}/items`, this.getHttpOptions());
  }

  addItem(listId: string, item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lists/${listId}/items`, item, this.getHttpOptions());
  }

  updateItem(listId: string, itemId: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/lists/${listId}/items/${itemId}`, item, this.getHttpOptions());
  }

  deleteItem(listId: string, itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lists/${listId}/items/${itemId}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
