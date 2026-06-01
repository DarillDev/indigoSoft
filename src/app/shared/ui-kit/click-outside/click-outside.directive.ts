import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class ClickOutsideDirective {
  private readonly elementRef = inject(ElementRef);

  public readonly clickOutside = output<Element>();

  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Element;

    if (!this.elementRef.nativeElement.contains(target)) {
      this.clickOutside.emit(target);
    }
  }
}
