import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/types/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
});
