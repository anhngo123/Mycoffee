import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/service/user';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Item } from 'src/app/service/item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.default.User | null>;
  displayName: string = '';
  userInfo: user | any;
  isAdmin = false;
  cartItemCount: number = 0;
  id: any;
  notificationCount: number = 0;
  isAdminUser: boolean = false;
  agencies: any[] = [];
  selectedValue: string | null = null;
  selectedAgency: string | null = null;
  isDropdownOpen: boolean = false;

  private itemsCollection!: AngularFirestoreCollection<Item>;
  private cartItemCountSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private data: DataService,
    private router: Router
  ) {
    this.cartItemCountSubscription = this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    this.user$ = this.afAuth.authState;
    this.itemsCollection = this.afs.collection<Item>('Items');

    if (this.authService.userData && this.authService.userData.uid) {
      this.authService.getUserInfo(this.authService.userData.uid).subscribe(
        (user) => {
          this.userInfo = user;
        },
        (error) => {
          console.log('Lỗi khi lấy thông tin người dùng: ', error);
        }
      );
    } else {
      console.log('Không có thông tin người dùng hoặc uid không hợp lệ');
    }
  }

  ngOnInit() {
    this.user$.subscribe(async (user) => {
      if (user) {
        const userRef = this.afs.doc(`users/${user.uid}`);
        const userSnapshot = await userRef.get().toPromise();
        const userData = userSnapshot?.data() as user;
        this.isAdminUser = userData?.role === 'admin' ? true : false;
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          this.userInfo = userInfo;
          if (this.userInfo) {
            this.displayName = this.userInfo.displayName || this.userInfo.name;
          }
        });
      } else {
        this.isAdminUser = false;
      }
    });

    this.data.getAllItemNotification().subscribe(
      (res) => {
        this.notificationCount = res.length;
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu sản phẩm');
      }
    );
  }


  logout() {
    this.authService.SignOut();
    this.isDropdownOpen = false;
  }

  gotoCart() {
    this.router.navigate(['/cart']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
