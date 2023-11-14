import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { Item } from 'src/app/service/item';
import { user } from 'src/app/service/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { recipe } from 'src/app/service/recipe';
@Component({
  selector: 'app-cart-agency',
  templateUrl: './cart-agency.component.html',
  styleUrls: ['./cart-agency.component.css']
})
export class CartAgencyComponent {

  cartItems: Item[] = [];
  guestInfo: any = {};
  total: number = 0;
  promotion: any = '';
  userInfo: user | any;
  isLoggedIn: boolean = false;
  paymentHandler: any = null;
  discountAmount: number = 0;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private afs: AngularFirestore,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
    this.initConfig((this.total - this.discountAmount) / 25000);

    this.authService.afAuth.authState.subscribe((user: any) => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          this.userInfo = userInfo;
          // Điền thông tin người dùng vào form khi đã đăng nhập
          if (this.userInfo) {
            this.guestName = this.userInfo.displayName || '';
            this.guestEmail = this.userInfo.email || '';
            this.guestAddress = this.userInfo.address || '';
            this.guestPhone = this.userInfo.phone || '';
          }
        });
      }
    });
  }
    async applyPromotion() {
    // Lấy mã khuyến mãi từ input
    const promotionCode = this.promotion;
    console.log(promotionCode);
    // Sử dụng AngularFirestore để truy vấn dữ liệu
    const promotionRef = this.afs.collection('promotion').doc(promotionCode);
    console.log(promotionRef);

    // Lắng nghe sự thay đổi của tài liệu với mã khuyến mãi tương ứng
    promotionRef.valueChanges().subscribe((promotion: any) => {
      console.log(promotion);

      if (promotion) {
        // Tính giảm giá dựa trên phần trăm giảm giá từ mã khuyến mãi
        const discountPercentage = promotion.discountPercentage;
        this.discountAmount = (this.total * discountPercentage) / 100;
      } else {
        // Nếu mã khuyến mãi không tồn tại, đặt giá trị giảm giá về 0
        this.discountAmount = 0;
      }
    });
  }
    private calculateTotal() {
      this.total = this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    removeFromCart(item: Item) {
      this.cartService.removeFromCart(item);
      this.calculateTotal();
    }

    clearCart() {
      this.cartService.clearCart();
      this.cartItems = [];
      this.total = 0;
    }

    updateQuantity(item: Item) {
      this.cartService.updateCartItemQuantity(item);
      this.calculateTotal();
    }

    async checkout() {
      if (this.isLoggedIn && this.userInfo) {
        // Cập nhật thông tin người dùng từ input form
        this.userInfo.name = this.guestName;
        this.userInfo.email = this.guestEmail;
        this.userInfo.address = this.guestAddress;
        this.userInfo.phone = this.guestPhone;
      } else {
        this.guestInfo = {
          name: this.guestName,
          email: this.guestEmail,
          address: this.guestAddress,
          phone: this.guestPhone,
        };
      }

      try {
        if (this.isLoggedIn) {
          await this.authService.updateUserInfo(this.userInfo.uid, this.userInfo);
        }
        for (const item of this.cartItems) {
          if (item.type != 'Cà phê') {
            const productQuery = this.afs.collection('Items', (ref) =>
              ref.where('id', '==', item.id)
            );
            const querySnapshot = await productQuery.get().toPromise();
            if (querySnapshot!.size != 0) {
              const productDoc = querySnapshot!.docs[0];
              const firestoreQuantity = productDoc.data() as
                | { quantity: number }
                | undefined;
              if (firestoreQuantity) {
                const newQuantity = firestoreQuantity.quantity - item.quantity;
                productDoc.ref.update({ quantity: newQuantity });
              }
            }
          }
        }

        this.showSuccessToast('Đặt hàng thành công!');
        this.saveOrderToFirestore();
        this.resetForm();
      } catch (error) {
        if (this.isLoggedIn) {
          window.alert('Lưu thông tin người dùng không thành công!');
        } else {
          window.alert('Lưu thông tin đơn hàng của khách không thành công!');
        }
      }
    }

    private initConfig(total: any): void {
      this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: total,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: total
                  }
                }
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: total,
                  },
                }
              ]
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details: any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
          if (this.isLoggedIn && this.userInfo) {
            // Cập nhật thông tin người dùng từ form nhập liệu
            this.userInfo.displayName = this.guestName;
            this.userInfo.email = this.guestEmail;
            this.userInfo.address = this.guestAddress;
            this.userInfo.phone = this.guestPhone;
            if (this.selectedPaymentMethod == 'thẻ tín dụng') {

              this.authService.updateUserInfo(this.userInfo.uid, this.userInfo)
                .then(() => {
                  this.showSuccessToast('Đặt hàng thành công!');
                  this.saveOrderToFirestore();
                })
                .catch((error) => {
                  window.alert('Lưu thông tin người dùng không thành công!');
                });
            }
            else {
              this.authService.updateUserInfo(this.userInfo.uid, this.userInfo)
                .then(() => {
                  this.showSuccessToast('Đặt hàng thành công!');
                  this.saveOrderToFirestore();
                })
                .catch((error) => {
                  window.alert('Lưu thông tin người dùng không thành công!');
                });
            }
          }
          else{
            this.saveOrderToFirestore();
            this.showSuccessToast('Đặt hàng thành công!');
          }
        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      };
    }

    saveOrderToFirestore() {
      // Lưu thông tin đơn hàng vào Firestore
      const orderId = this.afs.createId();
      const orderData = {
        id: orderId,
        cartItems: this.cartItems,
        buyer: this.userInfo || this.guestInfo,
        orderTime: new Date(),
        total: this.total - this.discountAmount,
        paymentMethod: this.selectedPaymentMethod,
      };

      const notification = {
        id: orderId,
        buyer: this.userInfo || this.guestInfo,
        orderTime: new Date(),
        total: this.total - this.discountAmount,
        describe: 'Bạn vừa có đơn hàng mới!',
      };

      // Thực hiện lưu vào Firestore
      this.authService
        .saveOrder(orderData)
        .then(() => {
          console.log('Đã lưu thông tin đơn hàng vào Firestore');
          this.cartService.clearCart();
          this.resetForm();
        })
        .catch((error) => {
          console.error('Lỗi khi lưu thông tin đơn hàng vào Firestore:', error);
        });

      // Thực hiện lưu vào Firestore
      this.authService
        .saveNotification(notification)
        .then(() => {
          console.log('Đã lưu thông tin thông báo vào Firestore');
        })
        .catch((error) => {
          console.error('Lỗi khi lưu thông tin thông báo vào Firestore:', error);
        });

      this.clearCart();
    }

    resetForm() {
      // Reset giá trị của guestInfo về một đối tượng trống
      this.guestInfo = {};

      // Reset form nhập liệu cho guest
      this.guestName = '';
      this.guestEmail = '';
      this.guestAddress = '';
      this.guestPhone = '';
    }

    // Tạo các biến để lưu thông tin nhập liệu của guest thông qua ngModel
    guestName: string = '';
    guestEmail: string = '';
    guestAddress: string = '';
    guestPhone: string = '';
    selectedPaymentMethod: string = '';

    CartNotEmpty(): boolean {
      return (
        this.cartItems.length > 0 && this.selectedPaymentMethod === 'tiền mặt'
      );
    }

    private showSuccessToast(message: string): void {
      this.snackBar.open(message, 'Đóng', {
        duration: 3000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['success'],
      });
    }
  }


