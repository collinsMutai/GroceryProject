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
  addProduct(data: any) {
    return this.http.post(this.APIURL, data);
  }
  getProductByID(id: any) {
    return this.http.get(`${this.APIURL}?id=${id}`);
  }
  
  updateProduct(id: string, data: any) {
    return this.http.put<any>(this.APIURL + id, data);
  }
  deleteProduct(id: any) {
    return this.http.delete('http://localhost:3000/products/' + id);
  }
}
