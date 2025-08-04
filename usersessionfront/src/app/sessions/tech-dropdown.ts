import { Component, forwardRef ,Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-tech-dropdown',
  templateUrl: './tech-dropdown.html',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TechDropdown),
    multi: true
  }]
})
export class TechDropdown implements ControlValueAccessor {
  ctrl = new FormControl();
  techs = ['Angular', 'React', 'Vue', 'Node.js'];
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.ctrl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.ctrl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
  this.ctrl.valueChanges.subscribe(this.onChange);
}

onBlur() {
  this.onTouched();
}
}
