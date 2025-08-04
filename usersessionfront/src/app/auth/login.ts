import { Component , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, RouterModule, NgIf],
})
export class Login {
  form: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const { email, password } = this.form.value;
  this.authService.login({ email, password }).subscribe({
    next: (res) => {
      if (res?.success && res.token) {
        localStorage.setItem('token', res.token);
        this.loginError = null;
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = 'Login failed: Invalid response structure.';
            this.cdr.detectChanges();

       }
    },
    error: (err) => {
      this.loginError = err?.error?.error || 'Invalid login. Please try again.';
          this.cdr.detectChanges();
     }
  });
}

}
