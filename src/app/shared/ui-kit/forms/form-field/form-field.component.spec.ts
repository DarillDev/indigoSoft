import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { UiKitLabelDirective } from './directives/ui-kit-label.directive';
import { UiKitPrefixDirective } from './directives/ui-kit-prefix.directive';
import { UiKitSuffixDirective } from './directives/ui-kit-suffix.directive';
import { UiKitHintDirective } from './directives/ui-kit-hint.directive';
import { UiKitErrorDirective } from './directives/ui-kit-error.directive';

@Component({
  standalone: true,
  imports: [
    FormFieldComponent,
    UiKitLabelDirective, UiKitPrefixDirective, UiKitSuffixDirective,
    UiKitHintDirective, UiKitErrorDirective,
  ],
  template: `
    <ui-kit-form-field>
      <label uiKitLabel>Name</label>
      <span uiKitPrefix data-testid="prefix">$</span>
      <input data-testid="input" />
      <span uiKitSuffix data-testid="suffix">USD</span>
      <span uiKitHint data-testid="hint">hint text</span>
      <span uiKitError data-testid="error">error text</span>
    </ui-kit-form-field>
  `,
})
class SlotTestHost {}

describe('FormFieldComponent', () => {
  describe('shell', () => {
    it('should create', () => {
      TestBed.configureTestingModule({ imports: [FormFieldComponent] });
      const fixture = TestBed.createComponent(FormFieldComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('content projection', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [SlotTestHost] }));

    it('should project label', () => {
      const f = TestBed.createComponent(SlotTestHost);
      f.detectChanges();
      expect(f.nativeElement.querySelector('[uiKitLabel]')).toBeTruthy();
    });

    it('should project prefix, input and suffix inside .ff-wrapper in correct order', () => {
      const f = TestBed.createComponent(SlotTestHost);
      f.detectChanges();
      const wrapper = f.nativeElement.querySelector('.ff-wrapper') as HTMLElement;
      const children = Array.from(wrapper.children).map(el => (el as HTMLElement).dataset['testid'] ?? el.tagName.toLowerCase());
      expect(children).toEqual(['prefix', 'input', 'suffix']);
    });

    it('should project hint below .ff-wrapper', () => {
      const f = TestBed.createComponent(SlotTestHost);
      f.detectChanges();
      const wrapper  = f.nativeElement.querySelector('.ff-wrapper');
      const hint     = f.nativeElement.querySelector('[data-testid="hint"]');
      expect(wrapper.compareDocumentPosition(hint) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('should project error below .ff-wrapper', () => {
      const f = TestBed.createComponent(SlotTestHost);
      f.detectChanges();
      const wrapper = f.nativeElement.querySelector('.ff-wrapper');
      const error   = f.nativeElement.querySelector('[data-testid="error"]');
      expect(wrapper.compareDocumentPosition(error) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });
});
