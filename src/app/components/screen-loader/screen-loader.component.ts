import { Component, HostListener, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { SpinnerComponent } from '../../bits/spinner.bit';

@Component({
    selector: 'ox-screen-loader',
    imports: [SpinnerComponent],
    templateUrl: './screen-loader.component.html'
})
export class ScreenLoaderComponent {
    loaderService = inject(LoaderService);

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.loaderService.isActive()) {
            event.preventDefault();
        }
    }
}
