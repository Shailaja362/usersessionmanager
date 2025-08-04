import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../shared/services/session.service';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from 'src/app/layout/breadcrumbs/breadcrumbs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-session-list',
  standalone: true,
  templateUrl: './session-list.html',
  imports: [CommonModule, Breadcrumb, RouterModule]
})

export class SessionList implements OnInit {
  sessions: any[] = [];
  paginatedSessions: any[] = [];
  currentPage = 1;
  pageSize = 5;
  pages: number[] = [];

  breadcrumbData = {
    page_title: 'Sessions List',
    back: '/sessons',
    links: [{ page: 'Sessions List', link: '/sessions/list', active_link: true }],
  };
  constructor(private sessionService: SessionService, private cdr: ChangeDetectorRef) { }


  get totalPages(): number {
    return Math.ceil(this.sessions.length / this.pageSize);
  }

  ngOnInit() {
    this.fetchSessions();
  }

  fetchSessions() {
    this.sessionService.getSessions().subscribe(data => {
      this.sessions = data;
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedSessions = this.sessions.slice(start, end);
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  deleteSession(id: number) {
    if (confirm('Are you sure you want to delete this session?')) {
      this.sessionService.deleteSession(id).subscribe({
        next: () => {
          this.sessions = this.sessions.filter(session => session.id !== id);
          this.updatePagination();
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Failed to delete session:', err);
        }
      });
    }
  }

  loadSessions() {
    this.sessionService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.updatePagination();
    });
  }

}
