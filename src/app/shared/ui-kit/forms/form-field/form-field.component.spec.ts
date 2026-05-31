import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { IFormField } from './form-field.token';
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

  function mockControl(overrides: Partial<{ focused: boolean; disabled: boolean; invalid: boolean; empty: boolean }> = {}): IFormField {
    return {
      focused:  signal(overrides.focused  ?? false),
      disabled: signal(overrides.disabled ?? false),
      invalid:  signal(overrides.invalid  ?? false),
      empty:    signal(overrides.empty    ?? true),
    };
  }

  describe('state', () => {
    let fixture: ComponentFixture<FormFieldComponent>;
    let component: FormFieldComponent;
    let wrapper: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [FormFieldComponent] });
      fixture   = TestBed.createComponent(FormFieldComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      wrapper = fixture.nativeElement.querySelector('.ff-wrapper');
    });

    it('should not have state classes by default', () => {
      expect(wrapper.classList).not.toContain('ff-wrapper--focused');
      expect(wrapper.classList).not.toContain('ff-wrapper--invalid');
      expect(wrapper.classList).not.toContain('ff-wrapper--disabled');
    });

    it('should add ff-wrapper--focused when control is focused', () => {
      component.registerControl(mockControl({ focused: true }));
      fixture.detectChanges();
      expect(wrapper.classList).toContain('ff-wrapper--focused');
    });

    it('should add ff-wrapper--invalid when control is invalid', () => {
      component.registerControl(mockControl({ invalid: true }));
      fixture.detectChanges();
      expect(wrapper.classList).toContain('ff-wrapper--invalid');
    });

    it('should add ff-wrapper--disabled when control is disabled', () => {
      component.registerControl(mockControl({ disabled: true }));
      fixture.detectChanges();
      expect(wrapper.classList).toContain('ff-wrapper--disabled');
    });

    it('should remove classes after unregisterControl', () => {
      component.registerControl(mockControl({ focused: true, invalid: true }));
      fixture.detectChanges();
      component.unregisterControl();
      fixture.detectChanges();
      expect(wrapper.classList).not.toContain('ff-wrapper--focused');
      expect(wrapper.classList).not.toContain('ff-wrapper--invalid');
    });

    it('should add ff--float-active on host when floatLabel=auto and control is focused', () => {
      fixture.componentRef.setInput('floatLabel', 'auto');
      component.registerControl(mockControl({ focused: true, empty: true }));
      fixture.detectChanges();
      expect(fixture.nativeElement.classList).toContain('ff--float-active');
    });

    it('should add ff--float-active on host when floatLabel=auto and not empty', () => {
      fixture.componentRef.setInput('floatLabel', 'auto');
      component.registerControl(mockControl({ empty: false }));
      fixture.detectChanges();
      expect(fixture.nativeElement.classList).toContain('ff--float-active');
    });

    it('should NOT add ff--float-active when floatLabel=always even if focused', () => {
      fixture.componentRef.setInput('floatLabel', 'always');
      component.registerControl(mockControl({ focused: true }));
      fixture.detectChanges();
      expect(fixture.nativeElement.classList).not.toContain('ff--float-active');
    });
  });
});
