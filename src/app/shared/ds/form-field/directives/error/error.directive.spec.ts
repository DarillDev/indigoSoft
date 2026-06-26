import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorDirective } from './error.directive';

@Component({ template: `<div dsError></div>`, imports: [ErrorDirective] })
class HostComponent {}

describe('ErrorDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: ErrorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(ErrorDirective))
      .injector.get(ErrorDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
