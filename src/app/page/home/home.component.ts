import { Component, OnInit,Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from 'src/app/service/item';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products$: Observable<Item[]>;
  filteredProducts$: Observable<Item[]> = of([]);
  constructor(private afs: AngularFirestore,private renderer: Renderer2){
    this.products$ = this.afs.collection<Item>('Items').valueChanges();
  }
  ngOnInit(): void {
    this.products$ = this.afs.collection<Item>('Items').valueChanges();
    this.filteredProducts$ = this.products$;
    const script = `
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/654faea3958be55aeaaeb87f/1hevk4ch0';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();`
    const el = this.renderer.createElement('script');
    el.text = script;
    this.renderer.appendChild(document.body, el);
  }
}


