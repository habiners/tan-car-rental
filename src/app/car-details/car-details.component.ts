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
    this.carService
      .getCarById(+this.route.snapshot.paramMap.get('id'))
      .then((result) => (this.car = result.data()));
    console.log('Nandato');
    if (!this.isNoCar()) this.updateTimes();
  }

  car?: Car;
  placeholderImg: string = 'https://i.stack.imgur.com/y9DpT.jpg';

  isNoCar(): boolean {
    return this.car === null || this.car === undefined;
  }

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
    let hrsToRent: number = +prompt(
      'Please input number of hours to rent:',
      '1'
    );
    console.log(hrsToRent);
    let deadline: Date = null;
    if (hrsToRent <= 0 || Object.is(hrsToRent, NaN)) {
      alert('Please input proper values.');
      return;
    } else deadline = DateTimeFunctions.addHours(new Date(), hrsToRent);
    this.carService.rentCar(this.car.carId, deadline);
    this.updateTimes();
    alert('Car rented successfuly!');
  }
  returnCar(): void {
    let hrsDeadline: number = DateTimeFunctions.getDifferenceInHours(
      this.car.dateRented,
      this.car.dateDeadline
    ); // Pila ka hours ra unta maghulam si user
    let hrsRented: number = DateTimeFunctions.getDifferenceInHours(
      this.car.dateRented,
      new Date()
    ); // Actual hours pila cya ni hulam
    let total = this.car.ratePerHr * hrsRented;
    this.carService.returnCar(this.car.carId);
    alert(
      'Your total payment is Php ' +
        total +
        '!' +
        (hrsRented > hrsDeadline
          ? '\nAlong with 10% penalty of Php ' +
            total * 0.1 +
            ' due to being late.'
          : '') +
        '\nCar returned successfuly!'
    );
  }

  formattedDateRented: string = '';
  formattedDateDeadline: string = '';
}
