import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public isMenuOpen: boolean = false;

  constructor(
    private cartservice: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  logout() {
    return this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  menuToggle() {
    return this.isMenuOpen;
  }
  addToCart(item: any) {
    this.cartservice.addToCart(item);
  }
}
