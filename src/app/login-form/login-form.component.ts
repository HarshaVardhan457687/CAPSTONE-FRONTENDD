import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() closeModal = new EventEmitter<void>();
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  } 

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (token) => {
          console.log('Login successful');
          this.closeModal.emit();
          this.router.navigate(['/content/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
        },
        complete: () => {

        }
      });
      this.closeModal.emit();
      this.router.navigate(['/content/dashboard']);
    }
  }
}
