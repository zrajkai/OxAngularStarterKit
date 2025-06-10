import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'ox-panel',
    imports: [MatIconModule, TranslatePipe],
    templateUrl: './panel.component.html'
})
export class PanelComponent {

    closePanel() {
        throw new Error('Method not implemented.');
    }
}
