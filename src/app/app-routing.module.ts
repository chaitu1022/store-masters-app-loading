import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MastersComponent } from './masters/masters.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {component: HomeComponent, path: 'home'},
  {component: MastersComponent, path: 'master'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
