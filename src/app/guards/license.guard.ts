import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot, } from '@angular/router';
import { environment } from '../../environments/environment';


export const licenseGuard = (route: ActivatedRouteSnapshot) => {

    return environment.license === 'full'
        ? true
        : createUrlTreeFromSnapshot(route, ['/no-license'])
};
