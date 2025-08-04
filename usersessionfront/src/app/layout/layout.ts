import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar';
import { Breadcrumb } from 'src/app/layout/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    Breadcrumb
   ]
})
export class Layout {}
