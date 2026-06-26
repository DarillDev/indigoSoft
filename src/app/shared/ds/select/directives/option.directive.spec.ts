import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type MockedObject } from 'vitest';
import { FORM_FIELD_SELECT } from '../config/select.token';
import { IFormFieldSelect } from '../interfaces/select.interface';
import { OptionDirective } from './option.directive';

@Component({
  imports: [OptionDirective],
  template: `<ds-option [value]="value" [disabled]="disabled">Apple</ds-option>`,
})
class HostComponent {
  value = 'a';
  disabled = false;
}

interface ISetupOptions {
  selected?: boolean;
  disabled?: boolean;
}

function setup({ selected = false, disabled = false }: ISetupOptions = {}) {
  const activeOptionId = signal<string | null>(null);
  const select = {
    isSelected: vi.fn().mockReturnValue(selected),
    selectOption: vi.fn(),
    activeOptionId,
  } as unknown as MockedObject<IFormFieldSelect<string>>;

  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [{ provide: FORM_FIELD_SELECT, useValue: select }],
  });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.componentInstance.disabled = disabled;
  fixture.detectChanges();

  const option = fixture.nativeElement.querySelector('ds-option') as HTMLElement;

  return { fixture, option, select };
}

describe('OptionDirective', () => {
  describe('Model', () => {
    describe('handleClick()', () => {
      it('should select its value on click', () => {
        const { option, select } = setup();

        option.click();

        expect(select.selectOption).toHaveBeenCalledTimes(1);
        expect(select.selectOption).toHaveBeenCalledWith('a');
      });

      it('should not select when disabled', () => {
        const { option, select } = setup({ disabled: true });

        option.click();

        expect(select.selectOption).not.toHaveBeenCalled();
      });
    });
  });
});
