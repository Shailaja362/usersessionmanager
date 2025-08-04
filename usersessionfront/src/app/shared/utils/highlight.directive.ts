import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightAngular]',
  standalone: true
})
export class HighlightAngularDirective {
  @Input() set appHighlightAngular(condition: boolean) {
    if (condition) {
      this.el.nativeElement.classList.add('bg-yellow-100');
    } else {
      this.el.nativeElement.classList.remove('bg-yellow-100');
    }
  }

  constructor(private el: ElementRef) {}
}
