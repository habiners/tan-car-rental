import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isNoReviews(): boolean {
    if (this.reviews == null || this.reviews == undefined) return true;
    return this.reviews.length <= 0;
  }

  @Input() reviews: Review[];
}
