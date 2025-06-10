import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { environment } from "@env/environment";
import { toObservable } from "@angular/core/rxjs-interop";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { startWith } from "rxjs/internal/operators/startWith";
import { filter } from "rxjs/internal/operators/filter";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { Base, Paginated } from "../models/base.models";
import { take } from "rxjs/internal/operators/take";
import { map } from "rxjs/internal/operators/map";
import { MatTableModule } from "@angular/material/table";
import { TranslatePipe } from "@ngx-translate/core";
import { CrudService } from "@app/services/crud.service";
import { merge } from "rxjs";


@Component({
    selector: 'ox-table',
    imports: [CommonModule, MatIconModule, MatTableModule, MatSortModule, TranslatePipe],
    templateUrl: './table.component.html',
})
export class TableComponent implements AfterViewInit {
    @ViewChild(MatSort) sort = new MatSort();
    @ViewChild('container') elementView: ElementRef = new ElementRef({});

    service = inject(CrudService<Paginated, Base>);

    dataSource = signal<Base[]>([]);
    triggerLoad = signal(0);
    trigger$ = toObservable(this.triggerLoad);
    newModelKey$ = toObservable(this.service.modelKey);

    skip = 0;
    limit = environment.settings.table.pageSize;
    noMoreRowsToLoad = false;
    lastScrollTop = 0;
    total = signal<number | null>(null);
    isLoading = false;

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => (this.skip = 0));

        merge(this.sort.sortChange, this.newModelKey$)
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

    onRowClicked(row: Base) {
        console.log('Row clicked: ', row);
    }

    onDelete(row: Base) {
        this.service.delete(row.id)
        .pipe(take(1))
        .subscribe(() => {
            this.triggerLoad.update((val) => val + 1);
        });
    }

    protected loadData(resetTable = false) {
        this.isLoading = true;

        if (resetTable) {
            this.skip = 0;
            this.dataSource.set([]);
            this.total.set(null);
            this.sort.active = 'id';
            this.sort.direction = 'desc';
            this.noMoreRowsToLoad = false;
        } else {
            this.skip += this.limit;
        }

        return this.service!.getAll(this.sort.active, this.sort.direction, this.skip, this.limit)
            .pipe(
                take(1),
                map((res: Paginated) => {
                    const items = (res[this.service.modelKey()] as Base[]);
                    if (!res || items.length === 0 || items.length < res.limit) {
                        this.noMoreRowsToLoad = true;
                    }

                    if (resetTable) {
                        this.dataSource.set(items);
                    } else {
                        this.dataSource.update(rows => {
                            return [...rows, ...items];
                        });
                    }

                    this.total.set(res.total);
                })
            );
    }
}
