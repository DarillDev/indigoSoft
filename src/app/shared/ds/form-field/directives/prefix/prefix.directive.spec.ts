import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrefixDirective } from './prefix.directive';

@Component({ template: `<div dsPrefix></div>`, imports: [PrefixDirective] })
class HostComponent {}

describe('PrefixDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: PrefixDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(PrefixDirective))
      .injector.get(PrefixDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
