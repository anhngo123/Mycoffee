import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { Promotion } from './promotion';
import { ingredient } from './ingredient';
import {recipe} from './recipe';
import { user } from './user';
import { agency } from './agency';
import { blog } from './blog';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private afs: AngularFirestore) { }


    addItem(item: Item) {
        item.id = this.afs.createId();
        return this.afs.collection('/Items').add(item);
    }

    getAllItem() {
        return this.afs.collection('/Items').snapshotChanges();
    }

    deleteItem(item: Item) {
        return this.afs.doc('/Items/' + item.id).delete();
    }

    updateItem(item: Item) {
        return this.afs.doc('/Items/' + item.id).update(item);
    }

    /* Danh sÃ¡ch API user */
    getAllItemUser() {
        return this.afs.collection('/users').snapshotChanges();
    }

    updateItemUser(item: user) {
        return this.afs.doc('/users/' + item.uid).update(item);
    }

    /* Danh sÃ¡ch API thÃ´ng bÃ¡o */
    getAllItemNotification() {
        return this.afs.collection('/notification').snapshotChanges();
    }

    // /* Danh sÃ¡ch API mÃ£ khuyáº¿n mÃ£i */
    getAllItemPromotion() {
        return this.afs.collection('/promotion').snapshotChanges();
    }

    addItemPromotion(item: Promotion) {
        item.id = this.afs.createId();
        return this.afs.collection('/promotion').add(item);
    }

    deleteItemPromotion(item: Promotion) {
        return this.afs.doc('/promotion/' + item.id).delete();
    }

    updateItemPromotion(item: Promotion) {
        return this.afs.doc('/promotion/' + item.id).update(item);
    }

    getAllItemRecipe() {
        return this.afs.collection('/recipe').snapshotChanges();
    }

    addItemRecipe(item: recipe) {
        item.id = this.afs.createId();
        return this.afs.collection('/recipe').add(item);
    }

    deleteItemRecipe(item: recipe) {
        return this.afs.doc('/recipe/' + item.id).delete();
    }

    updateItemRecipe(item: recipe) {
        return this.afs.doc('/recipe/' + item.id).update(item);
    }

     getAllItemIngredient() {
        return this.afs.collection('/ingredient').snapshotChanges();
    }

    addItemIngredient(item: ingredient) {
        item.id = this.afs.createId();
        return this.afs.collection('/ingredient').add(item);
    }

    deleteItemIngredient(item: ingredient) {
        return this.afs.doc('/ingredient/' + item.id).delete();
    }

    updateItemIngredient(item: ingredient) {
        return this.afs.doc('/ingredient/' + item.id).update(item);
    }

    getAllItemAgency() {
        return this.afs.collection('/Agency').snapshotChanges();
    }

    addItemAgency(item: agency) {
        item.id = this.afs.createId();
        return this.afs.collection('/Agency').add(item);
    }

    deleteItemAgency(item: agency) {
        return this.afs.doc('/Agency/' + item.id).delete();
    }

    updateItemAgency(item: agency) {
        return this.afs.doc('/Agency/' + item.id).update(item);
    }
    getAllItemBlog() {
      return this.afs.collection('/Blog').snapshotChanges();
  }

  addItemBlog(item: blog) {
      item.id = this.afs.createId();
      return this.afs.collection('/Blog').add(item);
  }

  deleteItemBlog(item: blog) {
      return this.afs.doc('/Blog/' + item.id).delete();
  }

  updateItemBlog(item: blog) {
      return this.afs.doc('/Blog/' + item.id).update(item);
  }
}
