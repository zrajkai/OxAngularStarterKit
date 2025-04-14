import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from '../../../../services/auth.service';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';

interface LoginForm {
    username: FormControl<string>;
    password?: FormControl<string>;
}

@Component({
    selector: 'hg-login',
    imports: [ReactiveFormsModule, TranslatePipe, AutoFocusDirective, NgOptimizedImage],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);

    readonly form = new FormGroup<LoginForm>({
        username: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        password: new FormControl('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });

    f: FormGroup = this.fb.nonNullable.group<LoginForm>({
        username: this.fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
        password: this.fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
    });

    onSubmit() {
        const { username, password } = this.form.value;
        this.authService.loginUser(username as string, password as string)
            .pipe(take(1))
            .subscribe({
                next: () => this.router.navigateByUrl('/main'),
                error: (err) => console.error(err),
            });

    }
}

