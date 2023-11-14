import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Item } from 'src/app/service/item';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-mod-item',
  templateUrl: './mod-item.component.html',
  styleUrls: ['./mod-item.component.css'],
})
export class ModItemComponent implements OnInit {
  ItemList: Item[] = [];
  ItemObj: Item = {
    id: '',
    image: '',
    name: '',
    type: '',
    price: 0,
    quantity: 0,
    branch: '',
    description: ''
  };
  id: string = '';
  ItemImage: string ='';
  ItemName: string = '';
  ItemQuantity: string = '';
  ItemPrice: string = '';
  ItemType: string = '';
  ItemBranch: string ='';
  ItemDescription: string ='';
  agencies: any[] = [];

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
    this.getAllItemAgency();
  }

  getAllItem() {
    this.data.getAllItem().subscribe(
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

  getAllItemAgency() {
    this.data.getAllItemAgency().subscribe(
      (res) => {
        this.agencies = res.map((e: any) => {
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
    this.ItemPrice = '';
    this.ItemType = '';
    this.ItemImage = '';
    this.ItemBranch='';
    this.ItemDescription ='';
  }

  viewItemDetails(item: any) {
    // Chuyển đến trang chi tiết với id của mục
    this.router.navigate(['', item.uid]);
  }

  addItem() {
    if (
      this.ItemName === '' ||
      this.ItemPrice === '' ||
      this.ItemType === '' ||
      (this.ItemType === 'Cà phê hoà tan' && this.ItemQuantity === '') ||
      this.ItemImage === '' ||
      this.ItemDescription ==='' ||
      this.ItemBranch ===''
    ) {
      alert('Điền đẩy đủ thông tin');
      return;
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.type = this.ItemType;
    this.ItemObj.quantity = parseInt(this.ItemQuantity);
    this.ItemObj.price = parseFloat(this.ItemPrice);
    this.ItemObj.image = this.ItemImage;
    this.ItemObj.branch = this.ItemBranch;
    this.ItemObj.description = this.ItemDescription


if  (isNaN(this.ItemObj.price))
{
  alert('test')
  return;
}

    this.data.addItem(this.ItemObj);
    this.showSuccessToast('Thêm sản phẩm thành công')
    this.resetForm();
    this.selectedItem = null;
  }

  deleteItem(item: Item) {
    if (window.confirm('Bấm xác nhận để xoá sản phẩm: ' + item.name + '?')) {
      this.data
        .deleteItem(item)
        .then(() => {
          this.showSuccessToast('Xoá sản phẩm thành công')
          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá sản phẩm: ' + error);
        });
    }
  }

  updateItem() {
    if (
      this.ItemName === '' ||
      this.ItemPrice === '' ||
      this.ItemType === '' ||
      (this.ItemType == 'Cà phê hoà tan' && this.ItemQuantity === '') ||
      this.ItemQuantity === '' ||
      this.ItemImage === '' ||
      this.ItemDescription ==='' ||
      this.ItemBranch ===''
    ) {
      alert('Điền đầy đủ thông tin');
      return;
    }

    // Đảm bảo ItemObj có ID của sản phẩm cần cập nhật
    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID sản phẩm cần cập nhật');
      return;
    }

    // Cập nhật ItemObj với dữ liệu hiện tại từ form
    this.ItemObj.name = this.ItemName;
    this.ItemObj.type = this.ItemType;
    this.ItemObj.quantity = parseInt(this.ItemQuantity);
    this.ItemObj.price = parseFloat(this.ItemPrice);
    this.ItemObj.image = this.ItemImage;
    this.ItemObj.branch = this.ItemBranch;
    this.ItemObj.description = this.ItemDescription

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItem(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật sản phẩm thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật sản phẩm: ' + error);
      });
    this.selectedItem = null;
  }

  selectedItem: Item | null = null;
  selectItem(item: Item) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;
    this.ItemType = item.type;
    this.ItemQuantity = item.quantity.toString();
    this.ItemPrice = item.price.toString();
    this.ItemImage = item.image;
    this.ItemBranch = item.branch;
    this.ItemDescription = item.description
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
