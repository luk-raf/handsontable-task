import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import Handsontable from 'handsontable/base';
import { NUMERIC_TYPE, TEXT_TYPE } from 'handsontable/cellTypes';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

registerAllModules();

@Component({
  selector: 'app-table-wrapper',
  standalone: true,
  imports: [CommonModule, HotTableModule],
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWrapperComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly data$: Observable<Product[]>;
  readonly id = 'hotInstance';

  readonly hotSettings: Handsontable.GridSettings = {
    columns: [
      {
        type: TEXT_TYPE,
        readOnly: true,
        title: 'Product Name',
      },
      {
        type: NUMERIC_TYPE,
        readOnly: true,
        title: 'Sales',
      },
      {
        type: TEXT_TYPE,
        readOnly: true,
        title: 'Region',
      },
    ],
    data: [],
    colHeaders: true,
    height: 'auto',
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
  };

  private readonly _hotRegisterer = new HotTableRegisterer();
  private readonly _destroySubject = new Subject<void>();

  constructor(private readonly productService: ProductService) {
    this.data$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.productService.loadData();
  }

  ngAfterViewInit(): void {
    this.productService.products$
      .pipe(
        map((data: Product[]) => {
          return data.map((item) => [item.name, item.sales, item.region]);
        }),
        takeUntil(this._destroySubject)
      )
      .subscribe((data) => {
        this._hotRegisterer.getInstance(this.id).loadData(data);
      });
  }

  ngOnDestroy(): void {
    this._destroySubject.next();
    this._destroySubject.complete();
  }
}
