import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from 'src/app/layout/breadcrumbs/breadcrumbs';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [CommonModule,Breadcrumb],
})
export class Dashboard implements OnInit {
 sessions: any[] = [];
 loading: boolean = true;
 error: string = '';
 userEmail: string = '';
 breadcrumbData = {
    page_title: 'Dashboard',
    back: '/',
    links: [
    ]
  };

  constructor(private sessionService: SessionService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchSessions();
    this.fetchUserEmail();
  }

  fetchSessions() {
    this.sessionService.getSessions().subscribe({
      next: (data) => {
        this.sessions = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load sessions';
        this.loading = false;
      },
    });
  }

  fetchUserEmail() {
    this.sessionService.getUserEmail().subscribe({
      next: (res) => {
        this.userEmail = res.useremail;
        console.log('test',res.useremail);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch user email', err);
      },
    });
  }

  deleteSession(id: number) {
  if (confirm('Are you sure you want to delete this session?')) {
    this.sessionService.deleteSession(id).subscribe({
      next: () => {
        this.sessions = this.sessions.filter(session => session.id !== id);
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Failed to delete session:', err);
      }
    });
  }
}
}
