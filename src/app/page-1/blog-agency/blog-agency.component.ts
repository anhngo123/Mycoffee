import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable, of,from } from 'rxjs';
import { Router } from '@angular/router';
import { blog } from 'src/app/service/blog';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-agency',
  templateUrl: './blog-agency.component.html',
  styleUrls: ['./blog-agency.component.css']
})
export class BlogAgencyComponent implements OnInit {
  orders: any[] = [];
  p: number = 1;
  private itemsCollection: AngularFirestoreCollection<blog>;
  searchResults: blog[] = [];
  items: Observable<blog[]>;
  selectedAgency = localStorage.getItem('selectedAgency');

  constructor(private afs: AngularFirestore, private router: Router, ) {
    this.itemsCollection = this.afs.collection<blog>('Blog');
    this.items = this.itemsCollection.valueChanges()
    this.filterQ1Blog();
   }

  ngOnInit(): void {

  }
  filterQ1Blog() {
    const promise = this.itemsCollection.ref.where('branch', '==', 'Q1').get();

    this.items = from(promise).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => doc.data() as blog))
    );
  }
}
