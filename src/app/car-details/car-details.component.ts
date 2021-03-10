import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    this.car = this.carService.getCarById(+ this.route.snapshot.paramMap.get('id'));
    console.log(this.car);
  }

  car?: Car;

  goBack(): void {
    this.location.back();
  }

}
