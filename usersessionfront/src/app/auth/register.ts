import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class Register {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  register() {
    if (this.form.invalid) return;

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.form.setErrors({ mismatch: true });
      return;
    }

    this.auth.register({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const message =
          err.error.errors.password ||
          (typeof err.error.error === 'string' ? err.error.error : null);
        this.form.setErrors({ serverError: message });
      }
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
