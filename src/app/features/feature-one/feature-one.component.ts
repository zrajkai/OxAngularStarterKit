import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { map, startWith, switchMap, take, filter, } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductDTO, productKeys, Products, ProductService } from '../../../services/product.service';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { AutoFocusDirective } from '../../directives/auto-focus.directive';

@Component({
    selector: 'ox-feature-one',
    imports: [CommonModule, TranslatePipe, MatTableModule, MatSortModule, MatIconModule, PageHeaderComponent, ReactiveFormsModule, AutoFocusDirective],
    providers: [ProductService],
    templateUrl: './feature-one.component.html',
    styles: ``
})
export class FeatureOneComponent implements AfterViewInit {
    @ViewChild(MatSort) sort = new MatSort();
    @ViewChild('container') elementView: ElementRef = new ElementRef({});

    dataSource = signal<ProductDTO[]>([]);
    productService = inject(ProductService);
    triggerLoad = signal(0);
    trigger$ = toObservable(this.triggerLoad);

    displayedColumns: string[] = productKeys;
    skip = 0;
    limit = environment.settings.table.pageSize;
    noMoreRowsToLoad = false;
    lastScrollTop = 0;
    total = signal<number | null>(null);
    isLoading = false;

    form = new FormGroup({
        search: new FormControl('')
    });

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => (this.skip = 0));

        this.sort.sortChange
            .pipe(
                startWith({}),
                filter(() => !this.isLoading),
                switchMap(() => {
                    return this.loadData(true);
                })
            )
            .subscribe(
                () => {
                    this.isLoading = false;
                }
            );

        this.trigger$
            .pipe(
                startWith({}),
                filter(() => !this.isLoading && !this.noMoreRowsToLoad),
                switchMap(() => {
                    return this.loadData();
                })
            )
            .subscribe(
                () => {
                    this.isLoading = false;
                }
            );
    }

    onTableScroll(event: Event): void {
        if (!event.target) {
            return;
        }

        const target = event.target as HTMLElement;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const offsetHeight = target.offsetHeight;
        const diff = scrollTop - this.lastScrollTop;
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        const isScrollingDown = diff >= 0;

        if (isScrollingDown && !this.isLoading && (scrollHeight - (scrollTop + offsetHeight)) < 50) {
            this.triggerLoad.update((val) => val + 1);
        }
    }

    onSubmit() {
        throw new Error('Method not implemented.');
    }

    onRowClicked(row: ProductDTO) {
        console.log('Row clicked: ', row);
    }

    private loadData(resetTable = false) {
        this.isLoading = true;
        this.skip += this.limit;

        return this.productService.getProducts(this.sort.active, this.sort.direction, this.skip, this.limit)
            .pipe(
                take(1),
                map((res: Products) => {
                    if (!res || res.products.length === 0 || res.products.length < res.limit) {
                        this.noMoreRowsToLoad = true;
                    }

                    if (resetTable) {
                        this.dataSource.set(res.products);
                    } else {
                        this.dataSource.update(rows => {
                            return [...rows, ...res.products];
                        });
                    }

                    this.total.set(res.total);
                })
            );
    }
}
