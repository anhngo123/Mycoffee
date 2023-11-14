import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/service/item';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  itemsCollection: AngularFirestoreCollection<Item>;
  searchResults: Item[] = [];
  items: Observable<Item[]>;
  selectedAgency = localStorage.getItem('selectedAgency');

  constructor(private afs: AngularFirestore, private router: Router, private cartService: CartService) {
    this.itemsCollection = this.afs.collection<Item>('Items');
    this.items = this.itemsCollection.valueChanges()

   }

  ngOnInit(): void {
    this.sortByName();

  }



  addToCart(product: Item) {
    // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product);
  }

   // Hàm để sắp xếp sản phẩm theo tên theo bảng chữ cái
   sortByName() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }

  // Hàm để sắp xếp sản phẩm theo giá tiền tăng dần
  sortByPriceAscending() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => a.price - b.price))
    );
  }

  // Hàm để sắp xếp sản phẩm theo giá tiền giảm dần
  sortByPriceDescending() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => b.price - a.price))
    );
  }

  goToItemDetail(product: Item) {
    this.router.navigate(['/detail', product.id]);
  }
  searchQuery: string = '';

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase(); // Chuyển query thành chữ thường

    if (query !== '') {
      // Perform the search using Firestore query
      this.itemsCollection.ref
        .get()
        .then((querySnapshot) => {
          // Clear the previous search results
          this.searchResults = [];

          // Iterate through the query results and add matching items to the searchResults array
          querySnapshot.forEach((doc) => {
            const item = doc.data() as Item;
            if (item.type === 'Cà phê' && item.name.toLowerCase().includes(query)) {
              this.searchResults.push(item);
            }
          });
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        });
    } else {
      // Clear the search results if the search query is empty
      this.searchResults = [];
    }
  }
  
}


