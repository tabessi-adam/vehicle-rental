import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-clients-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.scss']
})
export class ClientsDashboardComponent {
}
