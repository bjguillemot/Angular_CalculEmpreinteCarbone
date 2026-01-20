import { Routes } from '@angular/router';
import { CarbonFootprint } from './components/carbon-footprint/carbon-footprint';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'summary', component: CarbonFootprint, canActivate: [authGuard] },
    { path: 'profile/:username', component: Profile, canActivate: [authGuard] },
    { path: '**', component: Home },
];
