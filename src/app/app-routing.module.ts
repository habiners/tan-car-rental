import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './screens/landing-page/landing-page.component';
import { SignupComponent } from './screens/signup/signup.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CarListComponent } from './screens/car-list/car-list.component';
import { CarDetailsComponent } from './screens/car-details/car-details.component';
import { RentedCarsComponent } from './screens/rented-cars/rented-cars.component';
import { AddCarComponent } from './screens/add-car/add-car.component';
import { AvailableCarsComponent } from './screens/available-cars/available-cars.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: CarListComponent },
  { path: 'available-cars', component: AvailableCarsComponent},
  { path: 'rented-cars', component: RentedCarsComponent},
  { path: 'add-car', component: AddCarComponent},
  { path: 'car-details/:id', component: CarDetailsComponent},
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'car-list', component: CarListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
