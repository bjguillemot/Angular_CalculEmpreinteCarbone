import { Routes } from '@angular/router';
import { CarbonFootprint } from './components/carbon-footprint/carbon-footprint';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'summary', component: CarbonFootprint },
    { path: 'profile/:username', component: Profile },
    { path: '**', component: CarbonFootprint },
];
