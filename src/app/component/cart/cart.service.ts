import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public CartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.CartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any) {
    this.CartItemList.push(product);
    this.productList.next(this.CartItemList);
    this.getTotalPrice();
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.CartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    // this.CartItemList.splice(this.CartItemList.indexOf(product),1);
    this.CartItemList.map((a: any, index: any) => {
      if (a.id == product.id) this.CartItemList.splice(index, 1);
    });
    this.productList.next(this.CartItemList);
  }
  removeAllItems() {
    this.CartItemList = [];
    this.productList.next(this.CartItemList);
  }
}
