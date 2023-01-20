import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  baseUrl = "https://jsonplaceholder.typicode.com/";
  // list of masters available in json place holder websites
  readonly masters = ["posts", "comments", "albums", "photos", "todos", "users", "dummy"];

  // trigger flag when masters loaded completly.
  private isMasterLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private setIsMasterDataLoadingCompleted(flag: boolean) {
    this.isMasterLoaded.next(flag);
  }

  // trigger event where ever method is subscribed.
  getIsMasterDataLoadingCompleted(): BehaviorSubject<boolean> {
    return this.isMasterLoaded;
  }

  private logs: string[] = [];

  updateLogs(log: string) {
    this.logs.push(log);
  }

  getLogs(): string[] {
    return this.logs;
  }

  // storing master data
  private mastersData: MasterData[] = [];

  constructor(private http: HttpClient) { }

  loadMasters() {
    // Angular get call return type observable, looping master using map returns array of observables.
    // with the help of pipe operator we can able to define additional configuration the observable, available in rxjs.
    // Inside pipe operator we define catchError, that helps when ever define master not exist returns null.
    this.updateLogs("Preparing Master Get Calls");
    const masterCalls = this.masters.map(master => this.http.get(`${this.baseUrl}${master}`)
      .pipe(catchError((err) => { return of(null) })));

    // forkJoin returns data when all observable values emitted successfully.
    // forkJoin accepts array of observables and return response in the same sequence.
    this.updateLogs("Handover Master Calls To The ForkJoin");
    forkJoin(masterCalls).pipe(tap((x) => { this.updateLogs("Fork Join Started Subscribing Masters."); }))
      .subscribe(data => {
        this.updateLogs("Fork Join Returns Reponse");
        // looping through master array storing data in the mastersData
        this.masters.forEach((name, index) => {
          this.mastersData.push({ key: name, value: data[index] })
        });
        this.updateLogs("Master Data Stored In the App Service Completed");
        this.setIsMasterDataLoadingCompleted(true);
      });
  }

  // help to retrive the master data
  getMaster(masterName: string): MasterData | undefined {
    return this.mastersData.find(x => x.key === masterName);
  }

}

interface MasterData {
  key: string;
  value: any;
}
