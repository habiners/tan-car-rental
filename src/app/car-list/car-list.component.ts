import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  constructor(private carService: CarService) {}

  async ngOnInit(): Promise<void> {
    await this.carService.getAllCars().then((result) =>
      result.docs.forEach((docList) => {
        this.cars.push(docList.data());
      })
    );
    console.log(this.cars);
  }

  // cars: Car[];
  cars?: Car[] = [];
}
