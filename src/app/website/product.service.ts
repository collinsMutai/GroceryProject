import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private APIURL = 'http://localhost:3000/products/';

  getAllProducts() {
    return this.http.get(this.APIURL);
  }
  getProductByCategory(id: any) {
    return this.http.get(`${this.APIURL}?id=${id}`);
  }
}
