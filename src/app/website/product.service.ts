import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartUpdated: Subject<boolean> = new Subject<boolean>();
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
  getCart(id: any) {
    return this.http.get(`${this.CARTAPIURL}?CustId=${id}`);
  }
  deleteCartItem(id: any) {
    return this.http.delete(this.CARTAPIURL + id);
  }
}
