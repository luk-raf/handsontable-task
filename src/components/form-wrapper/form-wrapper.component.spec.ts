import { FormBuilder } from '@angular/forms';
import { MockService } from 'ng-mocks';

import { FormWrapperComponent } from './form-wrapper.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

describe('FormWrapperComponent', () => {
  let mockProductService: ProductService;

  const createComponent = () => {
    mockProductService = MockService(ProductService);

    return new FormWrapperComponent(new FormBuilder(), mockProductService);
  };

  describe('form', () => {
    it('should initialize form with default values', () => {
      // Act
      const component = createComponent();

      // Assert
      expect(component.formGroup.controls.name.value).toBe('');
      expect(component.formGroup.controls.region.value).toBe('');
      expect(component.formGroup.controls.sales.value).toBe(null);
    });
  });

  describe('onSubmit', () => {
    it('should call productService.addNewProduct() with new item', () => {
      // Arrange
      const component = createComponent();
      const newProduct: Product = {
        name: 'product 1',
        region: 'Africa',
        sales: 10000,
      };

      const callSpy = jest.spyOn(mockProductService, 'addNewProduct');
      component.formGroup.patchValue({ ...newProduct });

      // Act
      component.onSubmit();

      // Assert
      expect(callSpy).toHaveBeenCalledWith(newProduct);
    });

    it('should call formGroup.reset()', () => {
      // Arrange
      const component = createComponent();
      const newProduct: Product = {
        name: 'product 1',
        region: 'Africa',
        sales: 10000,
      };

      const callSpy = jest.spyOn(component.formGroup, 'reset');
      component.formGroup.patchValue({ ...newProduct });

      // Act
      component.onSubmit();

      // Assert
      expect(callSpy).toHaveBeenCalledTimes(1);
    });
  });
});
