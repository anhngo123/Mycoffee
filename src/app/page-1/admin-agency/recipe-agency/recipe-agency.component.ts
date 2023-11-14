import { recipe } from 'src/app/service/recipe';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-agency.component.html',
  styleUrls: ['./recipe-agency.component.css']
})
export class RecipeAgencyComponent implements OnInit {
  today = new Date();
  ItemList: recipe[] = [];
  ItemObj: recipe = {
    id: '',
    name: '',
    nameLowercase: '',
    ingredients: [],
    instructions:'',
    itemQuantity: [],
  };
  id: string = '';
  ItemName: string = '';
  ItemIngredient: { id: number, value: string, quantity: number }[] = [];
  ItemInstructions:string ='';
  inputItems: number[] =[];
  inputID: number = 0;
  agencies: any[] = [];
  ingredients: any[] = [];

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
    this.getAllItemAgency()
    this.getAllItemIngredient()
  }
  getAllItem() {
    this.data.getAllItemRecipe().subscribe(
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

  getAllItemIngredient() {
    this.data.getAllItemIngredient().subscribe(
      (res) => {
        this.ItemList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          data.importDate = data.importDate.toDate();

          return data;
        });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
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
    this.id  = '';
    this.ItemName  = '';
    this.ItemIngredient =[];
    this.ItemInstructions ='';
  }

  addItem() {
    if (this.ItemName === '' || this.ItemInstructions === '' || this.ItemIngredient.length == 0) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    // Kiểm tra xem mảng ItemIngredient có chứa chuỗi rỗng không
    for (const ingredient of this.ItemIngredient) {
      if (ingredient.value === '' || ingredient.quantity === 0) {
        alert('Mảng nguyên liệu không được chứa giá trị rỗng');
        return;
      }
    }
    this.ItemObj.name = this.ItemName;
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.ingredients = this.ItemIngredient;
    this.ItemObj.instructions = this.ItemInstructions;
    this.ItemObj.itemQuantity = this.agencies.map(agency => ({ agency: agency.name, quantity: 0 }));
    for (const ingredient of this.ItemIngredient) {
      const agencyIndex = this.ingredients.findIndex(agency => agency.nameLowercase == ingredient.value.toLocaleLowerCase());
      if (agencyIndex !== -1) {
        this.ItemObj.itemQuantity[agencyIndex].quantity += ingredient.quantity;
      }
    }
    // Đặt các thuộc tính khác ở đây

    this.data.addItemRecipe(this.ItemObj);
    this.showSuccessToast('Thêm công thức thành công');
    this.resetForm();
    this.selectedItem = null;
  }



  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  selectedItem: recipe | null = null;
  selectItem(item: recipe) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;
    this.ItemIngredient = item.ingredients;
    this.ItemInstructions = item.instructions;
    // Đặt các thuộc tính khác ở đây
  }

  deleteItem(item: recipe) {
    if (window.confirm('Bấm xác nhận để xoá công thức: ' + item.name + '?')) {
      this.data
        .deleteItemRecipe(item)
        .then(() => {
          this.showSuccessToast('Xoá công thức thành công')
          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá công thức: ' + error);
        });
    }
  }

  updateItem() {
    if (
      this.ItemName == ''||
      this.ItemIngredient.length == 0||
      this.ItemInstructions == ''
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
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.ingredients = this.ItemIngredient;
    this.ItemObj.instructions = this.ItemInstructions;
    this.ItemObj.itemQuantity = this.agencies.map(agency => ({ agency: agency.name, quantity: 0 }));

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItemRecipe(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật công thức thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật sản phẩm: ' + error);
      });
    this.selectedItem = null;
  }

  addInput() {
    this.inputID = this.inputItems.length +1
    const newId = this.inputID + 1; // Tạo một khóa duy nhất cho dòng mới
    this.inputItems.push(newId);
    this.ItemIngredient.push({ id: newId, value: '', quantity: 0});
  }
  removeInput(index: number) {
    this.ItemIngredient.splice(index, 1);
  }
}
