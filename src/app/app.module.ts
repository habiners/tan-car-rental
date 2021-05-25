import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LandingPageComponent } from './screens/landing-page/landing-page.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { AddCarComponent } from './screens/add-car/add-car.component';
import { RentedCarsComponent } from './screens/rented-cars/rented-cars.component';
import { AvailableCarsComponent } from './screens/available-cars/available-cars.component';
import { CarDetailsComponent } from './screens/car-details/car-details.component';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarCardComponent } from './components/car-card/car-card.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarListComponent,
    CarCardComponent,
    CarDetailsComponent,
    RentedCarsComponent,
    AddCarComponent,
    AvailableCarsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
