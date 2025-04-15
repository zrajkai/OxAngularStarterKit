import { Component, input } from '@angular/core';

@Component({
    selector: 'ox-page-header',
    imports: [],
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    title = input<string>('');
    total = input<number | null>(null);
}
