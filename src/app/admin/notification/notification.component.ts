import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { user } from 'src/app/service/user';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  ItemList: any[] = [];
  ItemObj: any = {
    id: '',
    describe: '',
    orderTime: '',
    total: '',
    buyer: '',
  };
  selectedImage: File | null = null;

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
  }

  getAllItem() {
    this.data.getAllItemNotification().subscribe(
      (res) => {
        this.ItemList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu sản phẩm');
      }
    );
  }


}
