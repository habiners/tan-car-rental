import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  constructor(private carService: CarService) {}

  ngOnInit(): void {}

  addCar(): void {
    if (this.bn == '' || this.cn == '' || this.imgUrl == '') {
      alert('Incomplete input!');
      return;
    }

    let car: Car = {
      carId: 0,
      brandName: this.bn,
      carName: this.cn,
      imgUrl: this.imgUrl,
      isRented: false,
      nWheels: this.nWheels,
      ratePerHr: this.rph,
    };
    console.log(car);
    this.carService.addCar(car);
    alert('Car was added successfully!');

    this.bn = '';
    this.cn = '';
    this.nWheels = 4;
    this.rph = 100;
    this.imgUrl = '';
  }

  firebaseData: Object = [];

  bn: string = '';
  cn: string = '';
  nWheels: number = 4;
  rph: number = 100;
  imgUrl: string = 'https://i.stack.imgur.com/y9DpT.jpg';
}
