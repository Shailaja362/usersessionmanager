import { Component, Input } from '@angular/core';
import { BreadcrumbData} from 'src/app/services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class Breadcrumb {
  @Input() bcdata: BreadcrumbData = {
  page_title: '',
  back: '',
  links: []
};
}
