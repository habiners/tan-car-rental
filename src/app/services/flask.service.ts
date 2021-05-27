import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private httpClient: HttpClient) { }

  async getSentimentAnalysis(input: string): Promise<void>{
    let cleaned: string = input.replace(/([^\w\s]|_|[^\x00-\x7F])+/g, "");
    let sentiment: JSON  = await this.httpClient.get('http://127.0.0.1:5002/sentiment-analysis/' + cleaned).toPromise() as JSON;
    console.log(sentiment)
  }
}
