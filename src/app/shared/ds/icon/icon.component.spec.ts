import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EIconName } from './enums/icon-name.enum';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [IconComponent] });

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('name', EIconName.Edit);

    expect(fixture.componentInstance).toBeTruthy();
  });
});
