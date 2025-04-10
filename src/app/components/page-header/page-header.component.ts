import { Component, input } from '@angular/core';

@Component({
    selector: 'hg-page-header',
    imports: [],
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    title = input('Title');
}
