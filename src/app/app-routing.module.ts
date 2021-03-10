import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CarListComponent } from './car-list/car-list.component'
import { CarDetailsComponent } from './car-details/car-details.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component'
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CarListComponent },
  { path: 'rented-cars', component: RentedCarsComponent},
  { path: 'car-details/:id', component: CarDetailsComponent},
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'car-list', component: CarListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
