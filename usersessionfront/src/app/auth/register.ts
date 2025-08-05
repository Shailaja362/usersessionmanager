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
      name: ['', [Validators.required]],
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

    const { name, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.form.setErrors({ mismatch: true });
      return;
    }

    this.auth.register({name, email, password }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
         const message =
          (Array.isArray(err?.error?.errors?.password) && err.error.errors.password.length > 0
            ? err.error.errors.password[0]
            : null) ||
          (typeof err?.error?.error === 'string' && err.error.error.trim() !== ''
            ? err.error.error
            : null) || (Array.isArray(err?.error?.errors?.name) && err.error.errors.name.length > 0
            ? err.error.errors.name[0]
            : null)
          'Something went wrong';
        this.form.setErrors({ serverError: message });
      }
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
