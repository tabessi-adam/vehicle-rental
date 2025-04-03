import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) { }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservationData);
  }

  getAllReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReservation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getVehicleReservations(vehicleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicle/${vehicleId}`);
  }

  getClientReservations(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`);
  }

  updateReservation(id: string, reservationData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, reservationData);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
