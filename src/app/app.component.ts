import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-masters-app-loading';

  constructor(private appService: AppService) {
    // calling masters
    this.appService.updateLogs("Master Function Call Initiated From App Component");
    this.appService.loadMasters();
  }
}
