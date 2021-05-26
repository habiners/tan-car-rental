import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

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
  }

  // async ngOnInit(): Promise<void> {
  //   this.carService.getAllCarsStream().subscribe((carsSnapshot) => {
  //     this.cars = carsSnapshot.map((carSnapshot) => {
  //       let queryDocumentSnapshot = carSnapshot.payload.doc;
  //       let car: Car = {
  //         carId: parseInt(queryDocumentSnapshot.id),
  //         brandName: queryDocumentSnapshot.get('brandName'),
  //         carName: queryDocumentSnapshot.get('carName'),
  //         imgUrl: queryDocumentSnapshot.get('imgUrl'),
  //         isRented: queryDocumentSnapshot.get('isRented'),
  //         nWheels: queryDocumentSnapshot.get('nWheels'),
  //         ratePerHr: queryDocumentSnapshot.get('ratePerHr'),
  //       };
  //       return car;
  //     });
  //   });
  // }

  cars?: Car[] = [];
}
