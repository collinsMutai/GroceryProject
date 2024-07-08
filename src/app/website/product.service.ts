import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private APIURL = 'http://localhost:3000/products/';
  private CARTAPIURL = 'http://localhost:3000/cart/';

  getAllProducts() {
    return this.http.get(this.APIURL);
  }
  getProductByCategory(id: any) {
    return this.http.get(`${this.APIURL}?id=${id}`);
  }
  addtoCart(obj: any): Observable<any> {
    return this.http.post(this.CARTAPIURL, obj);
  }
  getCart(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.CARTAPIURL}?id=${id}`);
  }
}
