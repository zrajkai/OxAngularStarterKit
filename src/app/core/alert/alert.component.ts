import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { timer, Subscription } from "rxjs";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: 'ox-alert',
    imports: [CommonModule, MatIconModule],
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
    alertService = inject(AlertService);
    sub$: Subscription = new Subscription();

    messages = this.alertService.getAlertMessages();

    ngOnInit(): void {
        this.sub$ = timer(0, 1000)
            .subscribe({
                next: () => {
                    this.alertService.hideAlerts(this.messages().filter(alert => alert.expiration && alert.expiration < Date.now()).map(alert => alert.id));
                }
            });
    }

    onEnter(id: string): void {
        this.alertService.removeExpiration(id);
    }

    onLeave(id: string): void {
        this.alertService.addExpiration(id);
    }

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
                classes = 'bg-red-500 border border-red-700';
                break;
            default:
                classes = 'bg-light-blue';
                break;
        }
        return classes;
    }

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }
}
