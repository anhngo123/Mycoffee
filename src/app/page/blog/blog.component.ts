import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { blog } from 'src/app/service/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit  {
  orders: any[] = [];
  p: number = 1;
  private itemsCollection: AngularFirestoreCollection<blog>;
  searchResults: blog[] = [];
  items: Observable<blog[]>;
  selectedAgency = localStorage.getItem('selectedAgency');

  constructor(private afs: AngularFirestore, private router: Router, ) {
    this.itemsCollection = this.afs.collection<blog>('Blog');
    this.items = this.itemsCollection.valueChanges()
   }

  ngOnInit(): void {

  }


}
