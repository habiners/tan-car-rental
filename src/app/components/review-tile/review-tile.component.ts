import { Component, OnInit, Input } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

import { FlaskService } from '../../services/flask.service';

import { Review } from '../../models/review';
@Component({
  selector: 'app-review-tile',
  templateUrl: './review-tile.component.html',
  styleUrls: ['./review-tile.component.css']
})
export class ReviewTileComponent implements OnInit {

  @Input() review: Review;
  constructor(private flaskService: FlaskService) { }

  ngOnInit(): void {
    this.review.rating
  }

  async displayChunked(): Promise<void>{
    await this.flaskService.displayChunked(this.review.review);
  }

  counter(i: number) {
    return new Array(i);
  }
}
