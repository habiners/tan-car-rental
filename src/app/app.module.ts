import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LandingPageComponent } from './screens/landing-page/landing-page.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SignupComponent } from './screens/signup/signup.component';
import { CarListComponent } from './screens/car-list/car-list.component';
import { AvailableCarsComponent } from './screens/available-cars/available-cars.component';
import { RentedCarsComponent } from './screens/rented-cars/rented-cars.component';
import { AddCarComponent } from './screens/add-car/add-car.component';
import { CarDetailsComponent } from './screens/car-details/car-details.component';

import { CarCardComponent } from './components/car-card/car-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewTileComponent }from './components/review-tile/review-tile.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupComponent,
    DashboardComponent,
    CarListComponent,
    AvailableCarsComponent,
    RentedCarsComponent,
    AddCarComponent,
    CarCardComponent,
    CarDetailsComponent,
    NavbarComponent,
    ReviewsComponent,
    ReviewTileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
