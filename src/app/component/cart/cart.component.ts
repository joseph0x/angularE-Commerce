import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(item: any) {
    if (confirm('are you sure to delete'))
      this.cartService.removeCartItem(item);
    alert('record deleted successfully');
  }
  emptycart() {
    this.cartService.removeAllItems();
  }
  incrementQuantity(item: any) {
    item.quantity++;
    item.total = item.price * item.quantity;
    this.grandTotal = this.cartService.getTotalPrice();
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.price * item.quantity;
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }
}
