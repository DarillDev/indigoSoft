import { ComponentFixture, TestBed } from '@angular/core/types/testing';
import { InternalLayoutComponent } from './internal-layout.component';

describe('InternalLayoutComponent', () => {
  let component: InternalLayoutComponent;
  let fixture: ComponentFixture<InternalLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InternalLayoutComponent],
    });

    fixture = TestBed.createComponent(InternalLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
