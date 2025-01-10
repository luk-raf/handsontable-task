import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProductForm } from '../../models/form/product-form.model';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormWrapperComponent {
  readonly formGroup: FormGroup<ProductForm>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService
  ) {
    this.formGroup = this.initializeForm();
  }

  onSubmit(): void {
    const newProduct: Product = {
      name: this.formGroup.controls.name.value,
      sales: this.formGroup.controls.sales.value as number,
      region: this.formGroup.controls.region.value,
    };

    this.productService.addNewProduct(newProduct);
    this.formGroup.reset();
  }

  private initializeForm(): FormGroup<ProductForm> {
    return this.formBuilder.group<ProductForm>({
      name: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sales: this.formBuilder.control(null, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
      }),
      region: this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
