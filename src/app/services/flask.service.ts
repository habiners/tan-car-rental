import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private httpClient: HttpClient) { }

  async getSentimentAnalysis(input: string): Promise<JSON>{
    try {
      let cleaned: string = input.replace(/([^\w\s]|_|[^\x00-\x7F])+/g, "");
      let sentiment: JSON = await this.httpClient.get('http://127.0.0.1:5002/sentiment-analysis/' + cleaned).toPromise() as JSON;
      return sentiment;
    } catch (error) {
      console.log(error);
      let errorJSON: any = {error: error};
      return errorJSON;
    }
  }

  async displayChunked(input: string): Promise<void>{
    try {
      console.log("FASFAS " + input);
      await this.httpClient.get('http://127.0.0.1:5002/chunker/' + input).toPromise()
    } catch (error) {
      console.log(error);
    }
  }
}
