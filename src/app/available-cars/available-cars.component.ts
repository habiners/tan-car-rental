import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';


@Component({
  selector: 'app-available-cars',
  templateUrl: './available-cars.component.html',
  styleUrls: ['./available-cars.component.css']
})
export class AvailableCarsComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.getUnrentedCars();
  }

  cars: Car[];
}
