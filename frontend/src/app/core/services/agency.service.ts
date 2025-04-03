import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private apiUrl = `${environment.apiUrl}/agents`;

  constructor(private http: HttpClient) { }

  createAgent(agentData: any): Observable<any> {
    return this.http.post(this.apiUrl, agentData);
  }

  getAllAgents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAgent(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAgent(id: string, agentData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, agentData);
  }

  deleteAgent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addVehicleToAgent(agentId: string, vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${agentId}/vehicles`, vehicleData);
  }

  getAgentVehicles(agentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${agentId}/vehicles`);
  }
}
