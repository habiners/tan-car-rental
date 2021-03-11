import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }

  addCar(): void {
    let car: Car = {
      carId: this.carService.getNewCarId(),
      carName: this.cn,
      imgUrl: this.imgUrl,
      isRented: false,
      nWheels: this.nWheels,
      ratePerHr: this.rph,
    };
    console.log(car);
    this.carService.addCar(car);
  }

  cn: string = "";
  nWheels: number = 0;
  rph: number = 1;
  imgUrl: string = "https://i.stack.imgur.com/y9DpT.jpg";

  imgError(image): void {
    image.onerror = "";
    image.src = "https://i.stack.imgur.com/y9DpT.jpg";
  }
}
