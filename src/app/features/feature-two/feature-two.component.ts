import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CardComponent } from "../../components/card/card.component";
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { Genders } from '../../shared/constants/gender.const';

@Component({
    selector: 'ox-feature-two',
    imports: [PageHeaderComponent, ReactiveFormsModule, CardComponent],
    providers: [ProductService],
    templateUrl: './feature-two.component.html'
})
export class FeatureTwoComponent {
    fb = inject(FormBuilder);
    taskService = inject(ProductService);

    form = this.fb.group({
        customId: [''],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.minLength(5), Validators.maxLength(150), Validators.email]],
        gender: [''],
        dob: [''],
        favorites: this.fb.array([]),
        note: ['', [Validators.maxLength(500)]],
    });

    genders = Genders;

    onSubmit() {
        this.taskService.getProducts().subscribe((response) => {
            console.log(response);
        });
    }
}
