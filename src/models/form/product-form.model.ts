import { FormControl } from '@angular/forms';

export interface ProductForm {
  name: FormControl<string>;
  sales: FormControl<number | null>;
  region: FormControl<string>;
}
