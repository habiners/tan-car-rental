import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.getAllCars();
    // this.cars = this.carService.getUnrentedCars();
  }

  cars: Car[];
}
