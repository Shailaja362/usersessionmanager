import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../shared/services/session.service';
import { Breadcrumb } from 'src/app/layout/breadcrumbs/breadcrumbs';
import { Router } from '@angular/router';
import { TechDropdown } from './tech-dropdown';
@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,Breadcrumb,TechDropdown],
  templateUrl: './session-form.html',
})
export class SessionForm {
  form: FormGroup;
 breadcrumbData = {
    page_title: 'Add Sessions',
    back: '/sessons',
    links: [{ page: 'Add Sessions', link: '/sessions/new', active_link: true }],
  };
  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.form = this.fb.group({
     date: ['', Validators.required],
     techStack: ['', Validators.required],
     topics: this.fb.array([
    this.fb.control('', Validators.required)
  ])
    });
  }

  get topics(): FormArray {
    return this.form.get('topics') as FormArray;
  }

  addTopic() {
    this.topics.push(this.fb.control('', Validators.required));
  }

  removeTopic(index: number) {
    this.topics.removeAt(index);
  }

  submit() {
  if (this.form.valid) {
    this.sessionService.createSession(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/sessions/list']);
      },
      error: (err) => {
        console.error('Session creation failed', err);
      }
    });
  } else {
    this.form.markAllAsTouched();
  }
}

}
