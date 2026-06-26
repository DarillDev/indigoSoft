import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LabelDirective } from './label.directive';

@Component({ template: `<div dsLabel></div>`, imports: [LabelDirective] })
class HostComponent {}

describe('LabelDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: LabelDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(LabelDirective))
      .injector.get(LabelDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
