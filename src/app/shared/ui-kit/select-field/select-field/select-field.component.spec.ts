import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IDsSelectOption } from '../interfaces/select-option.interface';
import { SelectFieldComponent } from './select-field.component';

const OPTIONS: IDsSelectOption<number>[] = [
  { id: 1, value: 1, label: 'One' },
  { id: 2, value: 2, label: 'Two' },
];

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent<number>;
  let fixture: ComponentFixture<SelectFieldComponent<number>>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SelectFieldComponent] });
    fixture = TestBed.createComponent<SelectFieldComponent<number>>(SelectFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
  });

  describe('Model', () => {
    describe('writeValue()', () => {
      it('should set the value signal', () => {
        component.writeValue(2);

        expect(component['value']()).toBe(2);
      });

      it('should reset value to null when given nullish', () => {
        component.writeValue(2);
        component.writeValue(null);

        expect(component['value']()).toBeNull();
      });
    });

    describe('handleChange()', () => {
      it('should set value, propagate change and mark as touched', () => {
        const onChange = vi.fn();
        const onTouched = vi.fn();
        component.registerOnChange(onChange);
        component.registerOnTouched(onTouched);

        component['handleChange'](2);

        expect(component['value']()).toBe(2);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(2);
        expect(onTouched).toHaveBeenCalledTimes(1);
        expect(onTouched).toHaveBeenCalledWith();
      });
    });

    describe('selectedOption()', () => {
      it('should be null when nothing is selected', () => {
        expect(component['selectedOption']()).toBeNull();
      });

      it('should resolve the option matching the current value', () => {
        component.writeValue(2);

        expect(component['selectedOption']()).toBe(OPTIONS[1]);
      });

      it('should use custom compareFn when provided', () => {
        fixture.componentRef.setInput('compareFn', (a: number, b: number) => a % 2 === b % 2);
        component.writeValue(4);

        expect(component['selectedOption']()).toBe(OPTIONS[1]);
      });
    });
  });
});
