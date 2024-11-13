import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { GuestsComponent } from './guests/guests.component';
import { VendorComponent } from './vendor/vendor.component';
import { BudgetComponent } from './budget/budget.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [ 
  {path: '', redirectTo: 'content', pathMatch: 'full' }, 
  {path: 'home', component: LandingPageComponent},
  {path: 'content', component: ContentComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent}, 
      {path: 'event', component: EventsComponent}, 
      {path: 'guest', component: GuestsComponent},
      {path: 'vendor', component: VendorComponent}, 
      {path: 'budget', component: BudgetComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
