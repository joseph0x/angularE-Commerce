import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  constructor(private api: ApiService, private cartservice: CartService) {}
  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      //to add to the array in the api
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });
    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
  }
  addToCart(item: any) {
    this.cartservice.addToCart(item);
  }
}
