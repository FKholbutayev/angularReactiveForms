import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockInventoryService } from './services/stock-investory.service'

@NgModule({
  declarations: [
    StockInventoryComponent, 
    StockBranchComponent, 
    StockProductsComponent, 
    StockSelectorComponent
  ],
  providers:[
    StockInventoryService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpModule
  ],
  exports: [
    StockInventoryComponent, 
    
  ]
})
export class StockInventoryModule {}