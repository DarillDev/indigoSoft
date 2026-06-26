import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDirective } from '@shared/ds/input';
import { ErrorDirective } from './directives/error/error.directive';
import { HintDirective } from './directives/hint/hint.directive';
import { PrefixDirective } from './directives/prefix/prefix.directive';
import { SuffixDirective } from './directives/suffix/suffix.directive';
import { FormFieldComponent } from './form-field.component';

@Component({
  imports: [
    FormFieldComponent,
    InputDirective,
    ReactiveFormsModule,
    PrefixDirective,
    SuffixDirective,
    HintDirective,
    ErrorDirective,
  ],
  template: `
    <ds-form-field>
      @if (showPrefix) {
        <span dsPrefix>$</span>
      }
      <input dsInput [formControl]="control" />
      @if (showSuffix) {
        <span dsSuffix>%</span>
      }
      @if (showHint) {
        <span dsHint>hint</span>
      }
      @if (showError) {
        <span dsError>error</span>
      }
    </ds-form-field>
  `,
})
class HostComponent {
  control = new FormControl<string>('');
  showPrefix = false;
  showSuffix = false;
  showHint = false;
  showError = false;
}

interface ISetupOptions {
  showPrefix?: boolean;
  showSuffix?: boolean;
  showHint?: boolean;
  showError?: boolean;
  disabled?: boolean;
}

function setup(options: ISetupOptions = {}) {
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;

  host.showPrefix = options.showPrefix ?? false;
  host.showSuffix = options.showSuffix ?? false;
  host.showHint = options.showHint ?? false;
  host.showError = options.showError ?? false;

  if (options.disabled) {
    host.control.disable();
  }

  fixture.detectChanges();

  const el = (selector: string): HTMLElement | null =>
    fixture.nativeElement.querySelector(selector);

  return { fixture, host, el };
}

describe('FormFieldComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
  });

  describe('View', () => {
    it('should not render prefix slot without dsPrefix', () => {
      const { el } = setup();

      expect(el('.prefix')).toBeNull();
    });

    it('should render prefix slot when dsPrefix is present', () => {
      const { el } = setup({ showPrefix: true });

      expect(el('.prefix')?.textContent?.trim()).toBe('$');
    });

    it('should render suffix slot when dsSuffix is present', () => {
      const { el } = setup({ showSuffix: true });

      expect(el('.suffix')?.textContent?.trim()).toBe('%');
    });

    it('should render hint slot when dsHint is present', () => {
      const { el } = setup({ showHint: true });

      const hint = el('.hint');
      expect(hint?.classList.contains('error')).toBe(false);
      expect(hint?.textContent?.trim()).toBe('hint');
    });

    it('should render error instead of hint when dsError is present', () => {
      const { el } = setup({ showHint: true, showError: true });

      const hint = el('.hint');
      expect(hint?.classList.contains('error')).toBe(true);
      expect(hint?.textContent?.trim()).toBe('error');
    });

    it('should mark wrapper disabled when control is disabled', () => {
      const { el } = setup({ disabled: true });

      expect(el('.wrapper')?.classList.contains('disabled')).toBe(true);
    });
  });

  describe('Model', () => {
    it('should wire control aria-describedby from hint and error ids', () => {
      const { el } = setup({ showHint: true, showError: true });

      const input = el('input') as HTMLInputElement;
      const describedBy = input.getAttribute('aria-describedby') ?? '';
      expect(describedBy).toContain('ds-hint-');
      expect(describedBy).toContain('ds-error-');
    });

    it('should focus input when wrapper is clicked', () => {
      const { el } = setup();
      const input = el('input') as HTMLInputElement;
      const spy = vi.spyOn(input, 'focus');

      el('.wrapper')?.click();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
    });
  });
});
