import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Product } from './models/product.interface'
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
export class StockInventoryComponent {
constructor(private fb:FormBuilder) {}
products: Product[] =[
  { "id": 1, "price":2800, "name": "MacBook Pro" },
  { "id": 2, "price":50, "name": "USB-C adapter" },
  { "id": 3, "price":400, "name": "Ipod" },
  { "id": 4, "price":900, "name": "Iphone" },
  { "id": 5, "price":600, "name": "Apple watch" }
]
  form = new FormGroup({
    store: this.fb.group({
      branch: '',
      code: ''
    }), 
    selector: this.createStock({}),    
    stock: this.fb.array([
      this.createStock({product_id:1, quantity: 10}),
      this.createStock({product_id:2, quantity: 10})
    ])
  })

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