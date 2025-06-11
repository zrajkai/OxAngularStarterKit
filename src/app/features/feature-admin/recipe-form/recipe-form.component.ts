import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelComponent } from '@app/components/panel/panel.component';
import { RecipeDTO } from '@app/core/models/recipe.models';
import { CrudService } from '@app/services/crud.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'ox-recipe-form',
    imports: [PanelComponent, ReactiveFormsModule, TranslatePipe],
    templateUrl: './recipe-form.component.html',
    styles: ``
})
export class RecipeFormComponent implements OnInit {
    fb = inject(FormBuilder)
    service = inject(CrudService);

    data = input<RecipeDTO>();

    form = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        ingredients: ['', [Validators.required, Validators.minLength(3)]],
        instructions: ['', [Validators.required, Validators.minLength(5)]],
        prepTimeMinutes: ['', [Validators.required, Validators.min(1), Validators.max(1440)]],
        cookTimeMinutes: ['', [Validators.required, Validators.min(1), Validators.max(1440)]],
    });

    unusedFunc() {}
    ngOnInit(): void {
        this.service.modelKey.set('recipe');
    }



    onSubmit() {
        console.debug('Form submitted', this.form.value);

    }

}
