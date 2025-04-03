import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/clients/vehicles`;

  constructor(private http: HttpClient) { }

  submitReview(vehicleId: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${vehicleId}/reviews`, reviewData);
  }

  getClientReviews(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/clients/reviews`);
  }

  getVehicleReviews(vehicleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${vehicleId}/reviews`);
  }
}
