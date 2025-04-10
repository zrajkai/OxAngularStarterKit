import { Injectable, Signal, signal } from "@angular/core";
import { environment } from "../environments/environment";

type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface Alert {
    id: string;
    message: string;
    type: AlertType;
    expiration?: number;
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
            return [...values, { id: this.generateNewId(), expiration: this.getExpiration(new Date()), ...message }];
        });
    }

    hideAlerts(ids: string[]): void {
        this.messages.update(values => {
            return values.filter(alert => !ids.includes(alert.id));
        });
    }

    hideAlert(id: string): void {
        this.messages.update(values => {
            return values.filter(alert => alert.id !== id);
        });
    }

    removeExpiration(id: string): void {
        this.messages.update(values => {
            const message = values.find(alert => alert.id === id);
            if (message) {
                message.expiration = undefined;
            }
            return values;
        });
    }

    addExpiration(id: string): void {
        this.messages.update(values => {
            const message = values.find(alert => alert.id === id);
            if (message) {
                message.expiration = this.getExpiration(new Date());
            }
            return values;
        });
    }

    getAlertMessages(): Signal<Alert[]> {
        return this.messages;
    }

    private generateNewId(): string {
        return Math.random().toString(16).slice(2);
    }

    private getExpiration(date: Date): number | undefined {
        return date.setSeconds(date.getSeconds() + (environment.settings.notification.lifespan / 1000));
    }
}
