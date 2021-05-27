import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-tile',
  templateUrl: './review-tile.component.html',
  styleUrls: ['./review-tile.component.css']
})
export class ReviewTileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() review: Review;
}
