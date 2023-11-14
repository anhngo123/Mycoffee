import { Component, OnInit } from '@angular/core';
import { agency } from 'src/app/service/agency';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit{
  ItemList: agency[] = [];
  ItemObj: agency = {
    id: '',
    name: '',
    contact: '',
    address:''
  };
  id: string = '';
  ItemName: string = '';
  ItemContact: string = '';
  ItemAddress: string = '';

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.getAllItem();
  }
  getAllItem() {
    this.data.getAllItemAgency().subscribe(
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
    this.ItemAddress = '';
    this.ItemContact = '';
  }

  addItem() {
    if (

      this.ItemName === '' ||
      this.ItemAddress === '' ||
      this.ItemContact === ''

    ) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.address = this.ItemAddress;

    this.ItemObj.contact = this.ItemContact;

    // Đặt các thuộc tính khác ở đây


    this.data.addItemAgency(this.ItemObj);
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

  selectedItem: agency | null = null;

  selectItem(item: agency) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;

    this.ItemAddress = item.address;
    this.ItemContact = item.contact;

    // Đặt các thuộc tính khác ở đây
  }

  deleteItem(item: agency) {

    if (window.confirm('Bấm xác nhận để xoá chi nhánh: ' + item.id + '?')) {
      this.data
        .deleteItemAgency(item)
        .then(() => {
          this.showSuccessToast('Xoá chi nhánh thành công');

          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá chi nhánh: ' + error);
        });
    }
  }

  updateItem() {
    if (

      this.ItemName === '' ||
      this.ItemAddress === '' ||
      this.ItemContact === ''
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
    this.ItemObj.contact = this.ItemContact;

    this.ItemObj.address = this.ItemAddress;

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItemAgency(this.ItemObj)
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


