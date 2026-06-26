import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectTriggerDirective } from './select-trigger.directive';

@Component({ template: `<div dsSelectTrigger></div>`, imports: [SelectTriggerDirective] })
class HostComponent {}

describe('SelectTriggerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: SelectTriggerDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(SelectTriggerDirective))
      .injector.get(SelectTriggerDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
