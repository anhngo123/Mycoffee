import { ingredient } from 'src/app/service/ingredient';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ItemList: ingredient[] = [];
  ItemObj: ingredient = {
    id: '',
    name: '',
    nameLowercase:'',
    quantity: '',
    importDate: '',
    origin: '',
    exp: '',
  };
  id: string = '';
  ItemName: string = '';
  ItemQuantity: string = '';
  ItemImportDate: string ='';
  ItemOrigin: string = '';
  ItemExp: string = '';

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
  }

  getAllItem() {
    this.data.getAllItemIngredient().subscribe(
      (res) => {
        this.ItemList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          return data;
        });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
      }
    );
  }

  resetForm() {
    this.id = '';
    this.ItemName = '';
    this.ItemQuantity = '';
    this.ItemOrigin = '';
    this.ItemExp  = '';
  }

  addItem() {
    if (

      this.ItemName === '' ||
      this.ItemQuantity === '' ||
      this.ItemOrigin === '' ||
      this.ItemExp === ''

    ) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.quantity = this.ItemQuantity;

    this.ItemObj.origin = this.ItemOrigin;
    this.ItemObj.exp = this.ItemExp;
    this.ItemObj.importDate = this.ItemImportDate;

    // Đặt các thuộc tính khác ở đây


    this.data.addItemIngredient(this.ItemObj);
    this.showSuccessToast('Thêm nguyên liệu thành công');
    this.resetForm();
    this.selectedItem = null;
  }

  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {

      duration: 3000 , // Thời gian hiển thị toast message (đơn vị: milliseconds)

      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  selectedItem: ingredient | null = null;

  selectItem(item: ingredient) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;

    this.ItemOrigin = item.origin;
    this.ItemExp = item.exp;

    this.ItemQuantity = item.quantity;
    this.ItemImportDate = item.importDate;
    // Đặt các thuộc tính khác ở đây
  }

  deleteItem(item: ingredient) {

    if (window.confirm('Bấm xác nhận để xoá nguyên liệu: ' + item.id + '?')) {
      this.data
        .deleteItemIngredient(item)
        .then(() => {
          this.showSuccessToast('Xoá nguyên liệu thành công');

          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá nguyên liệu: ' + error);
        });
    }
  }

  updateItem() {
    if (

      this.ItemName === '' ||
      this.ItemQuantity === '' ||
      this.ItemOrigin === '' ||
      this.ItemExp === ''
    ) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    // Đảm bảo ItemObj có ID của nguyên liệu cần cập nhật
    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID nguyên liệu cần cập nhật');

      return;
    }

    // Cập nhật ItemObj với dữ liệu hiện tại từ form
    this.ItemObj.name = this.ItemName;
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.quantity = this.ItemQuantity;

    this.ItemObj.importDate = this.ItemImportDate;

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItemIngredient(this.ItemObj)
      .then(() => {

        this.showSuccessToast('Cập nhật nguyên liệu thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật nguyên liệu: ' + error);

      });
    this.selectedItem = null;
  }
}
