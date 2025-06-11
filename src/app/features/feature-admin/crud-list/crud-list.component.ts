import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Paginated, Base } from '@app/core/models/base.models';
import { TableComponent } from '@app/core/table/table.component';
import { CrudService } from '@app/services/crud.service';
import { PageHeaderComponent } from "../../../components/page-header/page-header.component";
import { ActivatedRoute } from '@angular/router';
import { RecipeDTO, recipeKeys } from '@app/core/models/recipe.models';
import { productKeys } from '@app/core/models/product.models';
import { userKeys } from '@app/core/models/auth.models';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';

@Component({
    selector: 'ox-crud-list',
    imports: [TableComponent, PageHeaderComponent],
    providers: [CrudService],
    templateUrl: './crud-list.component.html'
})
export class CrudListComponent implements OnInit {
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
    dynamicComponentContainer!: ViewContainerRef;

    service = inject(CrudService<Paginated, Base>);
    activatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.service.modelKey.set(params['key']);

            switch (params['key']) {
                case 'recipes':
                    this.service.keys.set([...recipeKeys, 'actions']);
                    break;
                case 'products':
                    this.service.keys.set([...productKeys, 'actions']);
                    break;
                case 'users':
                    this.service.keys.set([...userKeys, 'actions']);
                    break;
            }

        });
    }

    onAdd() {
        this.loadDynamicComponent();
    }

    onEdit(row: RecipeDTO) {
        this.loadDynamicComponent(row);
    }

    private loadDynamicComponent(row?: RecipeDTO) {
        this.dynamicComponentContainer.clear();
        const componentRef = this.dynamicComponentContainer.createComponent(RecipeFormComponent);
        componentRef.setInput('data', { ...row } as RecipeDTO);
        componentRef.instance.close = () => this.closeDynamicComponent();
    }

    private closeDynamicComponent() {
        this.dynamicComponentContainer.clear();
    }
    
}
