// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent {}
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public productList: any;

  constructor(private api: ApiService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.loadProductList();
  }

  // loadProductList() {
  //   this.api.getProduct().subscribe((res) => {
  //     this.productList = res;
  //     this.productList.forEach((a: any) => {
  //       if (
  //         a.category === "women's clothing" ||
  //         a.category === "men's clothing"
  //       ) {
  //         a.category = 'fashion';
  //       }
  //       Object.assign(a, { quantity: 1, total: a.price });
  //     });
  //   });
  // }
  loadProductList() {
    this.api.getProduct().subscribe((res) => {
      this.productList = res.slice(0, 9); // Get the first 10 items from the array
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  addToCart(item: any) {
    this.cartservice.addToCart(item);
  }
}
