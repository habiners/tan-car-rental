import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CarListComponent } from './components/car-list/car-list.component'
import { CarDetailsComponent } from './screens/car-details/car-details.component';
import { RentedCarsComponent } from './screens/rented-cars/rented-cars.component'
import { AddCarComponent } from './screens/add-car/add-car.component';
import { AvailableCarsComponent } from './screens/available-cars/available-cars.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
