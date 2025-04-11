import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private isLoaderActive = signal(false);

    isActive = computed(() => this.isLoaderActive());

    showPageLoader(): void {
        this.isLoaderActive.set(true);
    }

    hidePageLoader(): void {
        this.isLoaderActive.set(false);
    }

}
