import { Component, input, forwardRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserRole } from '../../../shared/constants/user-role.const';

interface SidenavItem {
    title: string;
    permissions?: UserRole[];
    route?: string;
}

@Component({
    selector: 'hg-sidenav',
    imports: [forwardRef(() => SidenavItemComponent),],
    templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
    items: SidenavItem[] = [
        { title: 'Dashboard' },
        { title: 'Table /w infinite scroll', route: 'feature-one' },
        { title: 'Form with ease', route: 'feature-two' },
        { title: 'Admin', permissions: [UserRole.Admin] },
    ]
}

@Component({
    selector: 'hg-sidenav-item',
    imports: [RouterLink, RouterLinkActive],
    template: `
    @if(item() !== undefined) {
        <a [routerLink]="['/', 'main', item().route ?? item().title.toLocaleLowerCase()]" [routerLinkActive]="'bg-primary outline-amber-300 text-white'"
         class="hover:bg-primary cursor-pointer hover:text-white w-full">
            <li class="flex gap-x-2 p-3 bg-inherit rounded-[10px] ">
                <img src="./assets/icons/experiment.icon.svg" alt="experiment" class="w-[22px] h-[22px]" />
                {{item().title}}
            </li>
        </a>
    }
    `
})
export class SidenavItemComponent {
    item = input.required<SidenavItem>();
}
