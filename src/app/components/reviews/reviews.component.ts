import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() reviews: Review[];
}
