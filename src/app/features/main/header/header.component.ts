import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'hg-header',
    imports: [MatIconModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    authService = inject(AuthService);

    get username(): string {
        return this.authService.user?.name || '';
    }

    logout(): void {
        this.authService.logout();
    }

}
