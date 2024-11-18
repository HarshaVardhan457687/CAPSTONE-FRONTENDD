import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { GuestsComponent } from './guests/guests.component';
import { VendorComponent } from './vendor/vendor.component';
import { BudgetComponent } from './budget/budget.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TaskComponent } from './task/task.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [ 
  {path: '', redirectTo: 'home', pathMatch: 'full' }, 
  {path: 'home', component: LandingPageComponent},
  {path: 'content', component: ContentComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent}, 
      {path: 'event', children: [
        { path: '', component: EventsComponent },
        { path: 'tasks', component: TaskComponent }
      ]}, 
      {path: 'guest', component: GuestsComponent},
      {path: 'vendor', 
        children:[ 
          { path: '', component: VendorComponent },
          {path:'payment', component: PaymentComponent}
        ]
      }, 
      {path: 'budget', component: BudgetComponent}, 
      {path: 'task', component: TaskComponent},
      {path: 'payment', component: PaymentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
