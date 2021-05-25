import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../car.service';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.css']
})
export class RentedCarsComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getRentedCars().then((result) =>
      result.docs.forEach((docList) => this.cars.push(docList.data()))
    );
  }

  cars?: Car[] = [];
}
