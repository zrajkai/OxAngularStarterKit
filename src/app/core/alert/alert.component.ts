import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'hg-alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
})
export class AlertComponent {
    alertService = inject(AlertService);

    messages = this.alertService.getAlertMessages();


    onCloseAlert(id: string): void {
        this.alertService.hideAlert(id);
    }

    getAlertClasses(type: string): string {
        let classes = 'bg-light-blue';
        switch (type) {
            case 'info':
                classes = 'bg-light-blue';
                break;
            case 'success':
                classes = 'bg-green-500';
                break;
            case 'warning':
                classes = 'bg-yellow-500';
                break;
            case 'error':
                classes = 'bg-red-500';
                break;
            default:
                classes = 'bg-light-blue';
                break;
        }
        return classes;
    }
}