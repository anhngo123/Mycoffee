import { Injectable } from '@angular/core';
import { Item } from './item';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Item[] = [];
  private cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private snackBar: MatSnackBar) {
    this.loadCartItemsFromLocalStorage(); // Load dữ liệu giỏ hàng từ LocalStorage khi khởi tạo service
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
  }

  private loadCartItemsFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    }
  }

  addToCart(item: Item) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
  
    if (item.type === 'Cà phê') {
      if (existingItem) {
        // Nếu sản phẩm 'Cà phê' đã tồn tại trong giỏ hàng, tăng số lượng thêm 1
        existingItem.quantity++;
      } else {
        // Nếu sản phẩm 'Cà phê' chưa tồn tại, thêm sản phẩm mới vào giỏ hàng với số lượng là 1
        this.cartItems.push({ ...item, quantity: 1 });
      }
      this.showSuccessToast(`Đã thêm ${item.name} vào giỏ hàng`);
    } else if (item.quantity > 0) {
      // Xử lý sản phẩm khác, kiểm tra số lượng và thêm vào giỏ hàng
      if (existingItem) {
        existingItem.quantity++
        this.showSuccessToast(`Đã thêm ${item.name} vào giỏ hàng`);
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
        this.showSuccessToast(`Đã thêm ${item.name} vào giỏ hàng`);
      }
    } else {
      this.showSuccessToast('Sản phẩm đã hết hàng');
    }
  
    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
    console.log(localStorage.getItem('cart'));
  }
  
  getCartItemCount() {
    return this.cartItemCount;
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  removeFromCart(item: Item) {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity -= 1; // Giảm số lượng sản phẩm trong giỏ hàng đi 1
      if (this.cartItems[existingItemIndex].quantity <= 0) {
        // Nếu số lượng sản phẩm trong giỏ hàng bằng 0, xoá sản phẩm khỏi giỏ hàng
        this.cartItems.splice(existingItemIndex, 1);
      }
    }

    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  updateCartItems(items: Item[]) {
    this.cartItems = items;
    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  updateCartItemQuantity(item: Item) {
    // Kiểm tra số lượng mới có hợp lệ (lớn hơn 0) hay không
    if (item.quantity > 0) {
      // Cập nhật số lượng sản phẩm
      const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity = item.quantity;
      }
      // Cập nhật dữ liệu vào LocalStorage
      this.updateLocalStorage();
    }
  }

  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass:['success']
    });
  }
}


