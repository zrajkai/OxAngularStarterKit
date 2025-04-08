import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'hg-no-permission',
    imports: [],
    templateUrl: './no-permission.component.html',
    styles: ``
})
export class NoPermissionComponent implements OnInit {
    alertService = inject(AlertService);

    ngOnInit(): void {
        this.alertService.showWarning('NO_PERMISSION');

        setTimeout(() => {
            this.alertService.showError('IDONTKNOW');
        }, 3000);
        
        setTimeout(() => {
            this.alertService.showSuccess('SUCCS');
        }, 6000);
        
        setTimeout(() => {
            this.alertService.showInfo('INFORMATIOLN MESSAGE FOR YOU ALL');
        }, 9000);
    }

}
