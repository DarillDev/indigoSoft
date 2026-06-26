import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDirective } from './input.directive';

@Component({
  imports: [InputDirective, ReactiveFormsModule],
  template: `<input dsInput #ref="dsInput" [formControl]="control" />`,
})
class HostComponent {
  control = new FormControl('', { nonNullable: true });
  readonly directive = viewChild.required<InputDirective<string>>('ref');
}

function setup(arrange?: (control: FormControl<string>) => void) {
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  arrange?.(host.control);
  fixture.detectChanges();
  const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

  return { fixture, host, input, directive: host.directive() };
}

describe('InputDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
  });

  describe('Model', () => {
    describe('hasError()', () => {
      it('should be false for a pristine valid control', () => {
        const { directive } = setup();

        expect(directive.hasError()).toBe(false);
      });

      it('should be true when control is invalid and touched', () => {
        const { directive } = setup((control) => {
          control.addValidators(Validators.required);
          control.updateValueAndValidity();
          control.markAsTouched();
        });

        expect(directive.hasError()).toBe(true);
      });
    });

    describe('isEmpty()', () => {
      it('should be true when input value is empty', () => {
        const { directive } = setup();

        expect(directive.isEmpty()).toBe(true);
      });

      it('should be false when input has a value', () => {
        const { directive, input } = setup();
        input.value = 'text';

        expect(directive.isEmpty()).toBe(false);
      });
    });

    describe('isDisabled()', () => {
      it('should reflect the form control disabled state', () => {
        const { directive } = setup((control) => control.disable());

        expect(directive.isDisabled()).toBe(true);
      });
    });

    describe('onContainerClick()', () => {
      it('should focus the input element', () => {
        const { directive, input } = setup();
        const spy = vi.spyOn(input, 'focus');

        directive.onContainerClick();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith();
      });
    });

    describe('setDescribedByIds()', () => {
      it('should set aria-describedby from given ids', () => {
        const { directive, input } = setup();

        directive.setDescribedByIds(['a', 'b']);

        expect(input.getAttribute('aria-describedby')).toBe('a b');
      });

      it('should remove aria-describedby when ids are empty', () => {
        const { directive, input } = setup();

        directive.setDescribedByIds(['a']);
        directive.setDescribedByIds([]);

        expect(input.getAttribute('aria-describedby')).toBeNull();
      });
    });
  });
});
