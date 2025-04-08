import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../../../services/auth.service';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';

@Component({
    selector: 'hg-login',
    imports: [ReactiveFormsModule, TranslatePipe, AutoFocusDirective],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);

    readonly form = new FormGroup({
        username: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        password: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });

    onSubmit() {
        const { username, password } = this.form.value;
        this.authService.loginUser(username as string, password as string).subscribe({
            next: (res) => {

                console.log('LOGIN RES: ', res);
                this.router.navigateByUrl(
                    this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'
                );
            },
            error: (err) => {
                console.error(err);
            },
        });

    }
}

