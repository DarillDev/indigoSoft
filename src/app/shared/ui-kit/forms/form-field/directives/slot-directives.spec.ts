import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiKitLabelDirective } from './ui-kit-label.directive';
import { UiKitPrefixDirective } from './ui-kit-prefix.directive';
import { UiKitSuffixDirective } from './ui-kit-suffix.directive';
import { UiKitHintDirective } from './ui-kit-hint.directive';
import { UiKitErrorDirective } from './ui-kit-error.directive';

@Component({
  standalone: true,
  imports: [UiKitLabelDirective, UiKitPrefixDirective, UiKitSuffixDirective, UiKitHintDirective, UiKitErrorDirective],
  template: `
    <label uiKitLabel>A</label>
    <ui-kit-label>B</ui-kit-label>
    <span uiKitPrefix>C</span>
    <ui-kit-prefix>D</ui-kit-prefix>
    <span uiKitSuffix>E</span>
    <ui-kit-suffix>F</ui-kit-suffix>
    <span uiKitHint>G</span>
    <ui-kit-hint>H</ui-kit-hint>
    <span uiKitError>I</span>
    <ui-kit-error>J</ui-kit-error>
  `,
})
class TestHostComponent {}

describe('Slot Directives', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [TestHostComponent] }));

  it('should match [uiKitLabel] and ui-kit-label', () => {
    const f = TestBed.createComponent(TestHostComponent);
    expect(f.debugElement.queryAll(By.directive(UiKitLabelDirective)).length).toBe(2);
  });

  it('should match [uiKitPrefix] and ui-kit-prefix', () => {
    const f = TestBed.createComponent(TestHostComponent);
    expect(f.debugElement.queryAll(By.directive(UiKitPrefixDirective)).length).toBe(2);
  });

  it('should match [uiKitSuffix] and ui-kit-suffix', () => {
    const f = TestBed.createComponent(TestHostComponent);
    expect(f.debugElement.queryAll(By.directive(UiKitSuffixDirective)).length).toBe(2);
  });

  it('should match [uiKitHint] and ui-kit-hint', () => {
    const f = TestBed.createComponent(TestHostComponent);
    expect(f.debugElement.queryAll(By.directive(UiKitHintDirective)).length).toBe(2);
  });

  it('should match [uiKitError] and ui-kit-error', () => {
    const f = TestBed.createComponent(TestHostComponent);
    expect(f.debugElement.queryAll(By.directive(UiKitErrorDirective)).length).toBe(2);
  });
});
