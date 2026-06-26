import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  imports: [ClickOutsideDirective],
  template: `
    <div class="box" (clickOutside)="onOutside($event)">
      <button class="inside">inside</button>
    </div>
    <button class="outside">outside</button>
  `,
})
class HostComponent {
  target: Element | null = null;

  onOutside(target: Element): void {
    this.target = target;
  }
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Model', () => {
    describe('onDocumentClick()', () => {
      it('should emit the target when click happens outside the element', () => {
        const outside = fixture.nativeElement.querySelector('.outside') as HTMLButtonElement;

        outside.click();

        expect(host.target).toBe(outside);
      });

      it('should not emit when click happens inside the element', () => {
        const inside = fixture.nativeElement.querySelector('.inside') as HTMLButtonElement;

        inside.click();

        expect(host.target).toBeNull();
      });
    });
  });
});
