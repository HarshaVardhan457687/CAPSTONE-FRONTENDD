import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  showLogin = false;
  showSignup = false;

  openLogin(): void {
    this.showLogin = true;
    this.showSignup = false;
  }

  openSignup(): void {
    this.showSignup = true;
    this.showLogin = false;
  }

  closeModals(): void {
    this.showLogin = false;
    this.showSignup = false;
  }
}
