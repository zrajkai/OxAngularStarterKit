import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from '@app/services/auth.service';
import { AutoFocusDirective } from '@app/directives/auto-focus.directive';
import { CustomInputComponent } from "@app/directives/field-input.directive";

interface LoginForm {
    username: FormControl<string>;
    password?: FormControl<string>;
}

@Component({
    selector: 'ox-login',
    imports: [CommonModule, ReactiveFormsModule, TranslatePipe, AutoFocusDirective, NgOptimizedImage, CustomInputComponent],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);

    readonly form = this.fb.nonNullable.group<LoginForm>({
        username: this.fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        password: this.fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });


    getError(fieldKey: string) {
        const errors = this.form.get(fieldKey)?.errors;
        if (!errors) return ' ';
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const errorKey = errorKeys[0] ?? '';
            const errorValue = errors[errorKey];
            console.debug('errorKey', errorKey, 'errorValue', errorValue);
            return `error.ui.${errorKey}`;
        }
        return ' ';
    }

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

