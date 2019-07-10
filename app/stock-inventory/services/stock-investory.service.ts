import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/throw'
import { Product } from '../containers/stock-inventory/models/Product.interface';
import { Item } from '../containers/stock-inventory/models/item.interface';

@Injectable() 

export class StockInventoryService { 
    constructor(
       private http:Http 
    ) {}

    getCartItems():Observable<Item[]> {
        return this.http
            .get('/api/cart')
            .map((response:Response) => response.json())
            .catch((error:any) => Observable.throw(error.json()))
    }

    getProducts():Observable<Product[]> {
        return this.http
            .get('/api/products')
            .map((response:Response) => response.json())
            .catch((error:any) => Observable.throw(error.json()))
    }

    checkBranchId(id:string):Observable<boolean> {
        let search = new URLSearchParams(); 
        search.set('id', id); 
        return this.http
            .get('/api/branches', {search})
            .map((response:Response) => response.json())
            .map((response:any[])=>!!response.length)
            .catch((error:any) => Observable.throw(error.json()))
    }
}

