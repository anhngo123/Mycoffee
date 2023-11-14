import { DataService } from 'src/app/service/data.service';
import { blog } from 'src/app/service/blog';
import { AuthService } from 'src/app/service/auth.service';


import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mod-blog',
  templateUrl: './mod-blog.component.html',
  styleUrls: ['./mod-blog.component.css']
})
export class ModBlogComponent implements OnInit {
  ItemList: blog[] = [];
  ItemObj: blog = {
    id: '',
    image: '',
    title:'',
    content:'',
    uploadDate:'',
    branch:'',
};
id: string = '';
  ItemImage: string ='';
  ItemTitle: string ='';
  ItemContent: string ='';
  ItemUploadDate: string ='';
  ItemBranch:string='Q1';
  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.getAllItem();
    // this.getAllItemAgency();
  }

  getAllItem() {
    this.data.getAllItemBlog().subscribe(
      (res: any[]) => {
        this.ItemList = res
          .filter((e: any) => {
            const branchValue = e.payload.doc.data()?.branch; // Kiểm tra thông qua data()
            return branchValue === 'Q1';
          })
          .map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            data.branch = e.payload.doc.data()?.branch;
            return data;
          });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu sản phẩm');
      }
    );
  }





  resetForm() {
    this.id = '';
    this. ItemImage = '';
    this. ItemTitle = '';
    this. ItemContent = '';
    this. ItemUploadDate = '';

  }



  addItem() {
    if (
      this. ItemUploadDate ==='' ||
      this. ItemTitle === '' ||
      this. ItemContent === '' ||
      this.ItemBranch ===''||


      this.ItemImage ===  '' // Check if the image field is empty
    ) {
      alert('Điền đẩy đủ thông tin');
      return;
    }

    this.ItemObj.title = this.ItemTitle;
    this.ItemObj.content = this.ItemContent;
this.ItemObj.branch=this.ItemBranch;
    this.ItemObj.image = this.ItemImage;
  this.ItemObj.uploadDate= this. ItemUploadDate;






    this.data.addItemBlog(this.ItemObj);
    this.showSuccessToast('Thêm blog thành công')
    this.resetForm();
    this.selectedItem = null;
  }

  deleteItem(item: blog) {
    if (window.confirm('Bấm xác nhận để xoá blog: ' + item.id + '?')) {
      this.data
        .deleteItemBlog(item)
        .then(() => {
          this.showSuccessToast('Xoá blog thành công')
          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá blog: ' + error);
        });
    }
  }

  updateItem() {
    if (
      this.ItemImage=== '' ||
      this. ItemTitle === '' ||
      this. ItemContent === '' ||
      this.ItemBranch ===''||


      this. ItemUploadDate ==='' // Check if the image field is empty
    ) {
      alert('Điền đẩy đủ thông tin');
      return;
    }


    // Đảm bảo ItemObj có ID của sản phẩm cần cập nhật
    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID sản phẩm cần cập nhật');
      return;
    }

    // Cập nhật ItemObj với dữ liệu hiện tại từ form
    this.ItemObj.title = this.ItemTitle;
    this.ItemObj.content = this.ItemContent;
    this.ItemObj.branch = this.ItemBranch;

    this.ItemObj.image = this.ItemImage;
  this.ItemObj.uploadDate= this. ItemUploadDate;

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItemBlog(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật blog thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật blog: ' + error);
      });
    this.selectedItem = null;
  }

  selectedItem: blog | null = null;
  selectItem(item: blog) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemTitle = item.title;
    this.ItemContent = item.content;
    this.ItemUploadDate= item.uploadDate;
    this.ItemImage = item.image;
    this.ItemBranch=item.branch;

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
