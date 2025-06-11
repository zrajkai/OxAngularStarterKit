import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
    @Input() close?: () => void;

    fb = inject(FormBuilder)
    service = inject(CrudService);

    data = input<RecipeDTO>();

    form = this.fb.group({
        id: [''],
        name: [''],
        ingredients: [''],
        instructions: [''],
        prepTimeMinutes: [''],
        cookTimeMinutes: [''],
    });

    ngOnInit(): void {
        this.service.modelKey.set('recipe');
    }

    onSubmit() {
        console.debug('Form submitted', this.form.value);
        this.onClose();
    }

    onClose() {
        if (this.close) {
            this.close();
        }
    }
}
