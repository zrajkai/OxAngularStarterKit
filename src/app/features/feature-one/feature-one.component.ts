import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { merge, startWith, switchMap, catchError, map, of, debounceTime, distinctUntilChanged, fromEvent, delay, take, } from 'rxjs';
import { Data, DataService } from '../../../services/data.service';
import { environment } from '../../../environments/environment';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'hg-feature-one',
    imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, PageHeaderComponent, ReactiveFormsModule],
    providers: [DataService],
    templateUrl: './feature-one.component.html',
    styles: ``
})
export class FeatureOneComponent implements OnInit, AfterViewInit {
    dataSource = signal<Data[]>([]);
    displayedColumns: string[] = ['id', 'name', 'details'];
    page = 1;
    isLoading = false;
    dataService = inject(DataService);
    noMoreRowsToLoad = false;
    lastScrollTop = 0;
    form: FormGroup = new FormGroup({
        search: new FormControl('')
    });

    ngOnInit(): void {
        this.loadData();
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

        if (isScrollingDown && !this.isLoading && scrollHeight - (scrollTop + offsetHeight) < 50) {
            this.page++;
            this.loadData();
        }
    }

    // constructor() {
    //     fromEvent(window, 'scroll')
    //         .pipe(
    //             takeUntilDestroyed(),
    //             debounceTime(100),
    //             map(() => {
    //                 const st = window.pageYOffset || document.documentElement.scrollTop;
    //                 const diff = st - this.lastScrollTop;
    //                 this.lastScrollTop = st <= 0 ? 0 : st;
    //                 return diff >= 0 ? 'Down' : 'Up';
    //             }),
    //             distinctUntilChanged()
    //         )
    //         .subscribe((scrollDirection) => {
    //             console.log('Scroll Direction:', scrollDirection);
    //         });
    // }

    // tasks = signal<Task[]>([]);


    ngAfterViewInit(): void {
        // If the user changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        console.log('ngAfterViewInit called');
        //     //merge(this.sort.sortChange, this.paginator.page)
        //     merge(this.sort.sortChange)
        //         .pipe(
        //             startWith({}),
        //             switchMap(() => {
        //                 this.isLoadingResults = true;
        //                 return this.dataService!.fetchData(
        //                     this.currentPage,
        //                     this.pageSize
        //                 ).pipe(catchError(() => of(null)));
        //             }),
        //             map(data => {
        //                 // Flip flag to show that loading has finished.
        //                 this.isLoadingResults = false;
        //                 this.isRateLimitReached = data === null;

        //                 if (data === null) {
        //                     return [];
        //                 }

        //                 // Only refresh the result length if there is new data. In case of rate
        //                 // limit errors, we do not want to reset the paginator to zero, as that
        //                 // would prevent users from re-triggering requests.
        //                 this.resultsLength = data.total_count;
        //                 return data.items;
        //             }),
        //         )
        //         .subscribe(data => (this.data.set(data)));
    }

    onSubmit() {
        throw new Error('Method not implemented.');
    }

    onRowClicked(row: Data) {
        console.log('Row clicked: ', row);
    }

    private loadData(): void {
        console.debug('LOAD - ', this.page)
        this.dataService.fetchData(this.page, environment.settings.table.pageSize)
            .pipe(
                delay(3000),
                take(1)
            )
            .subscribe({
                next: (res: Data[]) => {
                    if (!res || res.length === 0) {
                        this.noMoreRowsToLoad = true;
                    }

                    this.dataSource.update(rows => {
                        return [...rows, ...res];
                    });
                },
                error: (error: HttpErrorResponse) => {
                    // TODO: display loading error to user, even within bottom row for loading indication
                    console.error('Failed to fetch data', error);
                }
            });
    }
}
