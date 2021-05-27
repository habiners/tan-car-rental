import { Component, OnInit, Input } from '@angular/core';

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
  }

  async displayChunked(): Promise<void>{
    console.log("Chunking...")
    await this.flaskService.displayChunked(this.review.review);
  }
}
