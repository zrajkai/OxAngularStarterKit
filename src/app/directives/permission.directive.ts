import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Directive({
    selector: '[hgHasPermissions]',
    standalone: true,
})
export class HasPermissionsDirective implements OnInit {

    private permissions: string[] = [];

    @Input()
    set hgHasPermissions(permissions: string[]) {
        this.permissions = permissions;
    }

    constructor(
        private templateRef: TemplateRef<HTMLElement>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.updateView();
    }

    private updateView() {
        if (this.permissions.includes(this.authService.role!)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}
