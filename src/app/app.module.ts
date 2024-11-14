import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component'; 
import {MatListModule} from '@angular/material/list';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventcardsComponent } from './eventcards/eventcards.component';
import { AddTaskComponent } from './addtask/addtask.component';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { EventsComponent } from './events/events.component';
import { GuestsComponent } from './guests/guests.component';
import { BudgetComponent } from './budget/budget.component';
import { VendorComponent } from './vendor/vendor.component';
import { EventCardComponent } from './event-card/event-card.component';  
import { TaskListListDownComponent } from './tasklist-list-down/tasklist-list-down.component';
import { AddGuestFormComponent } from './add-guest-form/add-guest-form.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GuestListComponent } from './guest-list/guest-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { HttpClientModule } from '@angular/common/http'; 
import { MatIconModule } from '@angular/material/icon'
import { ClickOutsideDirective } from './click-outside-directive';
import { TaskComponent } from './task/task.component';
import { TaskItemComponent } from './task-item/task-item.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopNavbarComponent,
    ContentComponent,
    DashboardComponent,
    EventcardsComponent,
    AddTaskComponent,
    AddTaskComponent,
    AddEventFormComponent,
    EventsComponent,
    GuestsComponent,
    BudgetComponent,
    VendorComponent,
    EventCardComponent, 
    TaskComponent,
    GuestListComponent,
    TaskListListDownComponent,
    VendorFormComponent,
    AddGuestFormComponent,
    LandingPageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NotificationDialogComponent,
    ClickOutsideDirective,
    TaskComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatListModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
