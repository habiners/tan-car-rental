import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.css']
})
export class RentedCarsComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.getRentedCars();
    // console.log(this.cars);
  }

  cars: Car[];
}
