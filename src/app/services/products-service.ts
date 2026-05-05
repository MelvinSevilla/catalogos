import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private http = inject(HttpClient);
  private apiUrl = environment.urlLaravel;
  public typePrice = new BehaviorSubject<string>('0');

  getCatalogo(params: any) {
    return this.http.post<any>(`${this.apiUrl}catalogo`, params);
  }
}
