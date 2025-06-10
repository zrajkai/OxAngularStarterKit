import { Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'ox-header',
    imports: [MatIconModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    authService = inject(AuthService);
    searchModalShown = false;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === 'k' && event.ctrlKey) {
            event.preventDefault();
            this.toggleModal();
        }
    }


    get username(): string {
        return this.authService.user?.name || '';
    }

    logout(): void {
        this.authService.logout();
    }

    private toggleModal() {
        this.searchModalShown = !this.searchModalShown;
    }

}
