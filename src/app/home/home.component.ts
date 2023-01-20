import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  logs: string[] = [];

  constructor(private appService: AppService) {
    this.logs = this.appService.getLogs();
  }

  ngOnInit(): void {
    this.appService.getIsMasterDataLoadingCompleted().subscribe(data =>  {
      this.logs = this.appService.getLogs();
    });
  }

}
