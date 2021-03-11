import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import DateTimeFunctions from '../date-functions';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.car = this.carService.getCarById(
      + this.route.snapshot.paramMap.get('id')
    );
    this.updateTimes();
  }

  car?: Car;
  placeholderImg: string = 'https://i.stack.imgur.com/y9DpT.jpg';

  updateTimes(): void {
    this.formattedDateRented = DateTimeFunctions.getDatetime(
      this.car.dateRented
    );
    this.formattedDateDeadline = DateTimeFunctions.getDatetime(
      this.car.dateDeadline
    );
  }

  goBack(): void {
    this.location.back();
  }

  rentCar(): void {
    let hrsToRent: number = +prompt('Please input number of hours to rent:');
    let deadline: Date = null;
    if (hrsToRent <= 0) {
      console.log('Please input proper values');
      return;
    } else deadline = DateTimeFunctions.addHours(new Date(), hrsToRent);
    this.carService.rentCar(this.car.carId, deadline);
    this.updateTimes();
    console.log('Car rented successfuly!');
  }
  returnCar(): void {
    this.carService.returnCar(this.car.carId);
    console.log('Car returned successfuly!');
  }

  formattedDateRented: string = '';
  formattedDateDeadline: string = '';
}
