import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

// Documentation: https://firebase.google.com/docs/firestore

export class AddCarComponent implements OnInit {
  constructor(private carService: CarService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firebaseData = this.firestore.collection('car');
    console.log(this.firebaseData);
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
    alert("Car added successfully!");
  }

  firebaseData: Object = [];

  cn: string = '';
  nWheels: number = 0;
  rph: number = 1;
  imgUrl: string = 'https://i.stack.imgur.com/y9DpT.jpg';
}
