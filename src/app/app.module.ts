import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CarListComponent } from './car-list/car-list.component';
import { CarCardComponent } from './car-card/car-card.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarListComponent,
    CarCardComponent,
    CarDetailsComponent,
    RentedCarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
