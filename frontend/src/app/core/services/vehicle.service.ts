import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) { }

  createVehicle(vehicleData: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicleData);
  }

  getAllVehicles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getVehicle(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateVehicle(id: string, vehicleData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, vehicleData);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateVehicleStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }

  getVehiclesByAgent(agentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/agent/${agentId}`);
  }
}
