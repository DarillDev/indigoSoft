import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { type MockedObject } from 'vitest';
import { ModalService } from './modal.service';

@Component({ template: '' })
class DummyComponent {}

describe('ModalService', () => {
  let service: ModalService;
  let dialog: MockedObject<Dialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService, { provide: Dialog, useValue: { open: vi.fn() } }],
    });

    service = TestBed.inject(ModalService);
    dialog = TestBed.inject(Dialog) as MockedObject<Dialog>;
  });

  describe('open()', () => {
    it('should open dialog with component and data, returning closed stream', async () => {
      const data = { id: 1 };
      dialog.open.mockReturnValue({ closed: of('result') } as unknown as DialogRef<unknown>);

      const result = await firstValueFrom(service.open<string>(DummyComponent, data));

      expect(result).toBe('result');
      expect(dialog.open).toHaveBeenCalledTimes(1);
      expect(dialog.open).toHaveBeenCalledWith(DummyComponent, { data });
    });

    it('should open dialog without data when omitted', () => {
      dialog.open.mockReturnValue({ closed: of(undefined) } as DialogRef<unknown>);

      service.open(DummyComponent).subscribe();

      expect(dialog.open).toHaveBeenCalledTimes(1);
      expect(dialog.open).toHaveBeenCalledWith(DummyComponent, { data: undefined });
    });
  });
});
