import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";

@Component({
    selector: 'hg-main',
    imports: [RouterOutlet, SidenavComponent, HeaderComponent],
    templateUrl: './main.component.html'
})
export class MainComponent {

}
