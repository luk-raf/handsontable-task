import { fakeAsync } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  it('call loadData should load example items', fakeAsync(() => {
    // Arrange
    const service = new ProductService();

    let result = [];
    service.products$.subscribe((products) => (result = products));

    // Act
    service.loadData();

    // Assert
    expect(result.length).toBe(3);
  }));

  it('call addNewProduct should add a new item to collection', fakeAsync(() => {
    // Arrange
    const service = new ProductService();
    const newProduct: Product = { name: 'P1', sales: 100, region: 'Australia' };

    let result: Product[] = [];
    service.products$.subscribe((products) => (result = products));

    // Act
    service.addNewProduct(newProduct);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual(newProduct);
  }));
});
