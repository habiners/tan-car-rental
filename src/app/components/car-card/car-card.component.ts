import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../car';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
})
export class CarCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() car: Car;
}
