import { Directive, ElementRef, Input } from '@angular/core';
export function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
     return original.apply(this, args);
  };
}
