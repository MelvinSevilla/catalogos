import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private http = inject(HttpClient);
  private apiUrl = environment.urlLaravel;

  getCatalogo(params: any) {
    return this.http.post<any>(`${this.apiUrl}catalogo`, params);
  }

  getCatalogoPrecios(params: any) {
    return this.http.post<any>(`${this.apiUrl}catalogowithprices`, params);
  }

  getCatalogoPreciosMayoristas(params: any) {
    return this.http.post<any>(`${this.apiUrl}catalogowithbetterprices`, params);
  }
}
