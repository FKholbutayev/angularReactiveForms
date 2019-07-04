import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'stock-inventory',
  styles: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <!-- break down into components -->
        
        <stock-branch></stock-branch>
        
        <stock-selector></stock-selector>
        
        <stock-products></stock-products>

        <div formGroupName="store">
          <input 
            type="text" 
            placeholder="Branch ID"
            formControlName="branch">
          <input 
            type="text" 
            placeholder="Manager Code"
            formControlName="code">
        </div>

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
  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl('')
    }), 
    selector: new FormGroup({
      product_id: new FormControl(''), 
      quantity: new FormControl(10)
    }), 
    stock: new FormArray([])
  })

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}