import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CarService } from '../../services/car.service';
import { AccountService } from 'src/app/services/account.service';
import { FlaskService } from 'src/app/services/flask.service';

import { Car } from '../../models/car';
import { Review } from '../../models/review';
import DateTimeFunctions from '../../date-functions';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private carService: CarService,
    private accountService: AccountService,
    private flaskService: FlaskService
  ) {}

  async ngOnInit(): Promise<void> {
    this.car = await this.carService.getCarById(
      +this.route.snapshot.paramMap.get('id')
    );
    if (!this.isNoCar()) {
      this.updateTimes();
      this.querySuccessful = false;
    }
    let reviewObj = await this.carService.getReviews(this.car.carId.toString());
    if (reviewObj) {
      this.reviews = reviewObj['reviews'];
      this.averageRating = isNaN(reviewObj['aveRating']) ? 0 : reviewObj['aveRating'];
    }
  }

  car?: Car;
  reviews?: Review[];
  averageRating: number = 1;

  querySuccessful: boolean = true;
  placeholderImg: string = 'https://i.stack.imgur.com/y9DpT.jpg';
  formattedDateRented: string = '';
  formattedDateDeadline: string = '';

  isNoCar(): boolean {
    return this.car == null || this.car == undefined;
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

  async rentCar(): Promise<void> {
    let hrsToRent: number = +prompt(
      'Please input number of hours to rent:',
      '1'
    );
    let deadline: Date = null;
    if (hrsToRent <= 0 || Object.is(hrsToRent, NaN)) {
      alert('Please input proper values.');
      return;
    } else deadline = DateTimeFunctions.addHours(new Date(), hrsToRent);
    this.carService.rentCar(this.car, deadline);
    this.updateTimes();
    alert('Car rented successfuly!');
    this.ngOnInit();
  }

  async returnCar(): Promise<void> {
    let hrsDeadline: number = DateTimeFunctions.getDifferenceInHours(
      this.car.dateRented,
      this.car.dateDeadline
    ); // Pila ka hours ra unta maghulam si user
    let hrsRented: number = DateTimeFunctions.getDifferenceInHours(
      this.car.dateRented,
      new Date()
    ); // Actual hours pila cya ni hulam
    let total = this.car.ratePerHr * hrsRented;
    this.carService.returnCar(this.car);
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
    let review: string = '';
    review = prompt("Would you like to review? Leave blank if you don't.", '');
    if (review != '') {
      let sentiment = await this.flaskService.getSentimentAnalysis(review);
      await this.carService.addReview(
        this.car.carId.toString(),
        this.accountService.getCurrentUserCompname(),
        review,
        sentiment
      );
    }
    this.ngOnInit();
  }

  counter(x: number) {
    return new Array(x);
  }
}
