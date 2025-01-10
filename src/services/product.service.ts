import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

export const exampleData: Product[] = [
  {
    name: 'Laptop Pro 15',
    sales: 1200,
    region: 'North America',
  },
  {
    name: 'Smartphone X10',
    sales: 950,
    region: 'Europe',
  },
  {
    name: 'Tablet Z8',
    sales: 720,
    region: 'Asia',
  },
];

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  readonly products$ = this._products.asObservable();

  loadData(): void {
    this._products.next([...exampleData]);
  }

  addNewProduct(newProduct: Product): void {
    const tempData = this._products.value;
    tempData.push(newProduct);

    this._products.next(tempData);
  }
}
