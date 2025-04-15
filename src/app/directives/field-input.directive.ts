import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'ox-input',
    template: `    
        <div class="field">
            <label class="" [for]="fieldKey()">
                {{ ('login.' + fieldKey()) | translate }}
            </label>
            <ng-content />
        </div>    
    `,
    imports: [TranslatePipe]
})
export class CustomInputComponent {
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    fieldKey = input('fieldKey');
}
