import { Injectable, Signal, signal } from "@angular/core";

type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface Alert {
    id: string;
    message: string;
    type: AlertType;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private messages = signal<Alert[]>([]);

    showWarning(alertCode: string): void {
        this.addAlert({ message: alertCode, type: 'warning' });
    }

    showError(alertCode: string): void {
        this.addAlert({ message: alertCode, type: 'error' });
    }

    showSuccess(alertCode: string): void {
        this.addAlert({ message: alertCode, type: 'success' });
    }

    showInfo(alertCode: string): void {
        this.addAlert({ message: alertCode, type: 'info' });
    }

    addAlert(message: Omit<Alert, 'id'>) {
        this.messages.update(values => {
            return [...values, { id: Math.random().toString(16).slice(2), ...message }];
        });

        setTimeout(() => {
            this.messages.update(values => {
                return values.slice(1);
            });
        }, 7000);
    }

    hideAlert(id: string): void {
        this.messages.update(values => {
            return values.filter(alert => alert.id !== id);
        });
    }

    getAlertMessages(): Signal<Alert[]> {
        return this.messages;
    }

}
