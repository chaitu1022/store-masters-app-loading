import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent {

  selectedMasterData: any;
  masters: string[] = [];
  dropdownChanged = false;

  constructor(private appService: AppService) {
    this.masters = this.appService.masters;
  }

  getMasterData(event: any) {
    if(event.target.value != -1) {
    this.dropdownChanged = true;
    this.selectedMasterData = this.appService.getMaster(event.target.value)?.value;
     if(!this.selectedMasterData) {
      this.dropdownChanged = false;
     }
    } else {
      this.dropdownChanged = false;
    }
  }
}
