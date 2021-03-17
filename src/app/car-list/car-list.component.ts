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
    // this.carService.getAllCars().subscribe(result => this.cars = result);
    await this.carService.getAllCars().then((result) =>
      result.docs.forEach((docList) => {
        this.cars.push(docList.data());
        // console.log((docList.data().dateRented));
        // console.log((docList.data().dateRented.seconds));
        // console.log(typeof(docList.data().dateRented));
      })
    );
    // this.cars = this.carService.getAllCars();
    console.log(this.cars);
    // console.log(this.cars[0].dateRented);
  }

  // cars: Car[];
  cars?: Car[] = [];
}
