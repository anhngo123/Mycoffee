import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  allOrders: any[] = [];
  orderDetails: any;
  sortByDate: boolean = false;
  sortByTotal: boolean = false;
  p: number = 1;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((orders) => {
      // Lọc các đơn đặt hàng có branch là 'Q1'
      this.allOrders = orders.filter(order => order.branch === 'Q1');
      this.sortOrdersByDateDescending();
    });
  }
  


  showOrderDetails(order: any) {
    // Nếu chi tiết đã hiển thị, ẩn nó đi khi nhấn lại
    if (order.isDetailsShown) {
      order.isDetailsShown = false;
    } else {
      // Nếu chi tiết chưa hiển thị, hiển thị nó lên
      order.isDetailsShown = true;
    }
  }

  sortOrdersByDate() {
    this.sortByTotal = false; // Đặt lại trạng thái sắp xếp theo tổng tiền
    this.allOrders.sort((a, b) => a.orderTime.seconds - b.orderTime.seconds);

    }


  sortOrdersByDateDescending(){
    this.sortByTotal = false; // Đặt lại trạng thái sắp xếp theo tổng tiền
    this.allOrders.sort((a, b) => b.orderTime.seconds - a.orderTime.seconds); // Sắp xếp theo ngày giảm dần
  }

  sortOrdersByTotal() {
    this.sortByDate = false; // Đặt lại trạng thái sắp xếp theo ngày
    this.allOrders.sort((a, b) => a.total - b.total); // Sắp xếp theo tổng tiền tăng dần
  }

  sortOrdersByTotalDescending() {
    this.sortByDate = false; // Đặt lại trạng thái sắp xếp theo ngày
    this.allOrders.sort((a, b) => b.total - a.total); // Sắp xếp theo giá tiền giảm dần
  }
}
