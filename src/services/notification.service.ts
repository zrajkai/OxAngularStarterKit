import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importing Material Snackbar
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }
    showNotification(message: string, action = 'Close') {
        this.snackBar.open(message, action, {
            //duration: environment.settings.notification.lifespan,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',

        });
    }
}
