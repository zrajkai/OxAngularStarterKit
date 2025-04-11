import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'hg-no-permission',
    templateUrl: './no-permission.component.html'
})
export class NoPermissionComponent implements OnInit {
    alertService = inject(AlertService);

    ngOnInit(): void {
        this.alertService.showWarning('NO_PERMISSION');

        setTimeout(() => {
            this.alertService.showError('The value in field 1 must be \'valid\' when the value in field 2 is NOT_OK!');

        }, 3000);

        setTimeout(() => {
            this.alertService.showSuccess('SUCCS');
        }, 6000);

        setTimeout(() => {
            this.alertService.showInfo('INFORMATIOLN MESSAGE FOR YOU ALL');
        }, 9000);
    }

}
