import { Directive, ElementRef, afterNextRender } from "@angular/core";

@Directive({
    selector: '[hgAutoFocus]'
})
export class AutoFocusDirective {
    constructor(private elementRef: ElementRef<HTMLElement>) {
        afterNextRender(() => {
            this.elementRef.nativeElement.focus();
        });
    }
}
