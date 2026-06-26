import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HintDirective } from './hint.directive';

@Component({ template: `<div dsHint></div>`, imports: [HintDirective] })
class HostComponent {}

describe('HintDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: HintDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(HintDirective))
      .injector.get(HintDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
