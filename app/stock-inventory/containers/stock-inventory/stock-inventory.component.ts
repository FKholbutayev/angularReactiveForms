import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Product } from './models/product.interface'; 
import { Item } from './models/item.interface'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map'


import { StockInventoryService } from '../../services/stock-investory.service'

@Component({
  selector: 'stock-inventory',
  styles: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <!-- break down into components -->
        
        <stock-branch
          [parent]="form">
        </stock-branch>
        
        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>
        
        <stock-products
          [parent]="form"
          [map] = "productMap"
          (removed) ="removeStock($event)">
        </stock-products>

        

        <div class="stock-inventory__buttons">
          <button 
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {
  
  products: Product[];
  productMap:Map<number, Product>; 
  
  form = new FormGroup({
    store: this.fb.group({
      branch: '',
      code: ''
    }), 
    selector: this.createStock({}),    
    stock: this.fb.array([])
  })

constructor(
    private fb:FormBuilder, 
    private stockService:StockInventoryService) {}

    ngOnInit() {
      const cart = this.stockService.getCartItems();
      const products = this.stockService.getProducts();
  
      Observable
        .forkJoin(cart, products)
        .subscribe(([cart, products]: [Item[], Product[]]) => {
          
          const myMap = products
            .map<[number, Product]>(product => [product.id, product]);
          
          this.productMap = new Map<number, Product>(myMap);
          this.products = products;
          cart.forEach(item => this.addStock(item));
        });
  
    }



  

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '', 
      quantity: stock.quantity || 10
    })
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray; 
    control.push(this.createStock(stock))
  }
  removeStock({group, index} : {group:FormGroup, index:number}) {
    console.log(group,index); 
    const control = this.form.get('stock') as FormArray; 
    control.removeAt(index)
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}