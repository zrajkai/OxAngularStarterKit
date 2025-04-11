import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'hg-header',
    imports: [],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    authService = inject(AuthService);

    get username(): string {
        return this.authService.user?.name || '';
    }

}
