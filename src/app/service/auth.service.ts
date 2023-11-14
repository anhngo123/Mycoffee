import { Injectable, NgZone } from '@angular/core';
import { user } from '../service/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Khai báo biến userData để lưu trữ thông tin người dùng đã đăng nhập
  userData: any;

  // Khai báo biến userInfo để lưu thông tin người dùng dưới dạng đối tượng User (đã định nghĩa trước đó)
  userInfo: user | null = null;

  // Constructor của AuthService, tiêm vào các dependency cần thiết
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service để loại bỏ cảnh báo ngoài phạm vi (outside scope)
  ) {
    /* Đăng ký lắng nghe sự kiện thay đổi trạng thái đăng nhập của người dùng.
    Khi đăng nhập hoặc đăng xuất, thông tin người dùng sẽ được lưu vào localStorage. */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

// Hàm đăng nhập bằng email/password
SignIn(email: string, password: string) {
  // Sử dụng AngularFireAuth để thực hiện đăng nhập bằng email và mật khẩu
  return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      // Nếu đăng nhập thành công, lưu thông tin người dùng vào Firestore và điều hướng đến trang dashboard

      this.afAuth.authState.subscribe(async (user) => {
        if (user) {
          if (await this.isAdmin()) {
            // Nếu là admin chung, chuyển hướng đến 'admin'
            this.router.navigate(['admin']);
          } else if (await this.isAdminBranch()) {
            // Nếu là admin chi nhánh, chuyển hướng đến 'admin-agency'
            this.router.navigate(['admin-agency']);
          } else {
            // Nếu không phải admin chung hoặc admin chi nhánh, chuyển hướng đến 'dashboard'
            this.router.navigate(['dashboard']);
          }
        } else {
          // Nếu không có người dùng đăng nhập, chuyển hướng đến 'dashboard'
          this.router.navigate(['dashboard']);
        }
      });

    })
    .catch((error) => {
      // Nếu có lỗi, hiển thị thông báo lỗi
      window.alert(error.message);
    });
}

// Hàm đăng ký bằng email/password
SignUp(email: string, password: string) {
  // Sử dụng AngularFireAuth để thực hiện đăng ký bằng email và mật khẩu
  return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Gọi hàm SendVerificationMail() để gửi email xác thực đến người dùng mới đăng ký.
      Sau đó lưu thông tin người dùng vào Firestore. */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) => {
      // Nếu có lỗi, hiển thị thông báo lỗi
      window.alert(error.message);
    });
}

// Gửi email xác thực khi người dùng đăng ký
SendVerificationMail() {
  return this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    // .then(() => {
    //   this.router.navigate(['verify-email-address']);
    // });
}

// Hàm đặt lại mật khẩu khi người dùng quên mật khẩu
ForgotPassword(passwordResetEmail: string) {
  return this.afAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Nhấn vào đường link trong email để đổi mật khẩu');
    })
    .catch((error) => {
      window.alert(error);
    });
}
 // Phương thức trả về true nếu người dùng đã đăng nhập và email đã xác thực
 get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null && user.emailVerified !== false ? true : false;
}
  /* Hàm đặt dữ liệu người dùng khi đăng nhập bằng tên người dùng/mật khẩu,
  đăng ký bằng tên người dùng/mật khẩu
  vào cơ sở dữ liệu Firestore bằng AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userRef);
    const userData: user = {
      uid: user.uid,
      name:user.name || user.email,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role || null,
      agency:user.agency || null,
      phone: user.phone || null,
      address: user.address || null,
    };


    return userRef.set(userData, {
      merge: true,
    });
  }

  // Hàm kiểm tra xem người dùng có quyền truy cập 'admin' không
  async isAdmin(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userRef = this.afs.doc(`users/${user.uid}`);
      const userSnapshot = await userRef.get().toPromise();
      const userData = userSnapshot?.data() as user;
      return userData!.role === 'admin';
    }
    return false;
  }
  async isAdminBranch(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userRef = this.afs.doc(`users/${user.uid}`);
      const userSnapshot = await userRef.get().toPromise();
      const userData = userSnapshot?.data() as user;
      return userData!.role === 'admin-agency';
    }
    return false;
  }

  // Hàm đăng xuất
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  // Hàm lấy thông tin người dùng dựa trên UID
  getUserInfo(uid: string): Observable<user | null> {
    const userRef: AngularFirestoreDocument<user> = this.afs.doc<user>(
      `users/${uid}`
    );
    return userRef.valueChanges().pipe(
      map((user) => {
        return user || null;
      })
    );
  }

  // Hàm cập nhật thông tin người dùng
  updateUserInfo(uid: string, data: Partial<user>): Promise<void> {
    const userRef: AngularFirestoreDocument<user> = this.afs.doc<user>(
      `users/${uid}`
    );
    return userRef.update(data);
  }


  // Hàm lấy thông tin người dùng
  getFieldFromFirestore(uid: string, field: string): Observable<string> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.valueChanges().pipe(
      map((userData: any) => {
        return userData[field] || ''; // Trả về giá trị của trường field nếu có hoặc trả về chuỗi rỗng nếu không có
      })
    );
  }

  getNameFromFirestore(uid: string): Observable<string> {
    return this.getFieldFromFirestore(uid, 'name');
  }

  // Phương thức để lưu thông tin đơn hàng vào Firestore
  saveOrder(orderData: any): Promise<void> {
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection('orders')
      .doc();
    return orderRef.set(orderData);
  }

  saveNotification(orderData: any): Promise<void> {
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection('notification')
      .doc();
    return orderRef.set(orderData);
  }
}
