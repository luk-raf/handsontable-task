import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableWrapperComponent } from '../components/table-wrapper/table-wrapper.component';
import { FormWrapperComponent } from '../components/form-wrapper/form-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormWrapperComponent,
    TableWrapperComponent,
    FlexLayoutModule,
    RouterOutlet,
  ],
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'handsontable-angular-app';
}
