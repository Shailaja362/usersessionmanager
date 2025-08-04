import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  private user = new BehaviorSubject<string | null>(null);
  getUser() {
    return this.user.asObservable();
  }
  setUser(email: string) {
    this.user.next(email);
  }
}
