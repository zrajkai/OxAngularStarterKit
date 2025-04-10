import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'hg-no-permission',
    imports: [],
    templateUrl: './no-permission.component.html',
    styles: ``
})
export class NoPermissionComponent implements OnInit {
    alertService = inject(AlertService);
    notificationService = inject(NotificationService);

    ngOnInit(): void {
        this.notificationService.showNotification('NO_PERMISSION');
        this.alertService.showWarning('NO_PERMISSION');
        
        setTimeout(() => {
            this.notificationService.showNotification('NFORMATIOLN MESSAGE FOR YOU ALL');
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
