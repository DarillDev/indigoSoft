import { DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { type MockedObject } from 'vitest';
import { ModalContainerComponent } from './modal-container.component';

describe('ModalContainerComponent', () => {
  let component: ModalContainerComponent;
  let fixture: ComponentFixture<ModalContainerComponent>;
  let dialogRef: MockedObject<DialogRef>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalContainerComponent],
      providers: [{ provide: DialogRef, useValue: { close: vi.fn() } }],
    });

    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(DialogRef) as MockedObject<DialogRef>;
    fixture.componentRef.setInput('title', 'Edit user');
    fixture.detectChanges();
  });

  describe('Model', () => {
    describe('close()', () => {
      it('should close the dialog', () => {
        component['close']();

        expect(dialogRef.close).toHaveBeenCalledTimes(1);
        expect(dialogRef.close).toHaveBeenCalledWith();
      });
    });
  });
});
