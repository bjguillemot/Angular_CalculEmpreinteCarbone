import { Routes } from '@angular/router';
import { CarbonFootprint } from './components/carbon-footprint/carbon-footprint';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'summary', component: CarbonFootprint, canActivate: [authGuard] },
    { path: 'profile', canActivate: [authGuard], children: 
        [
            { path: ':username', component: Profile },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ] 
    },
    { path: '**', component: Home },
];
