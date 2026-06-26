import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent<string>;
  let fixture: ComponentFixture<SelectComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SelectComponent] });
    fixture = TestBed.createComponent<SelectComponent<string>>(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Model', () => {
    describe('writeValue()', () => {
      it('should set the value', () => {
        component.writeValue('a');

        expect(component.value()).toBe('a');
      });

      it('should reset value to null when given null', () => {
        component.writeValue('a');
        component.writeValue(null as unknown as string);

        expect(component.value()).toBeNull();
      });
    });

    describe('isEmpty()', () => {
      it('should be true when no value selected', () => {
        expect(component.isEmpty()).toBe(true);
      });

      it('should be false when a value is selected', () => {
        component.value.set('a');

        expect(component.isEmpty()).toBe(false);
      });
    });

    describe('isSelected()', () => {
      it('should be false when nothing selected', () => {
        expect(component.isSelected('a')).toBe(false);
      });

      it('should compare by strict equality by default', () => {
        component.value.set('a');

        expect(component.isSelected('a')).toBe(true);
        expect(component.isSelected('b')).toBe(false);
      });

      it('should use custom compareFn when provided', () => {
        fixture.componentRef.setInput('compareFn', (v1: string, v2: string) => v1[0] === v2[0]);
        component.value.set('apple');

        expect(component.isSelected('avocado')).toBe(true);
        expect(component.isSelected('banana')).toBe(false);
      });
    });

    describe('selectOption()', () => {
      it('should set value, notify form and close panel', () => {
        const onChange = vi.fn();
        const onTouched = vi.fn();
        component.registerOnChange(onChange);
        component.registerOnTouched(onTouched);

        component.selectOption('a');

        expect(component.value()).toBe('a');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('a');
        expect(onTouched).toHaveBeenCalledTimes(1);
        expect(onTouched).toHaveBeenCalledWith();
        expect(component['isOpen']()).toBe(false);
      });
    });

    describe('onContainerClick()', () => {
      it('should open the panel', () => {
        component.onContainerClick();

        expect(component['isOpen']()).toBe(true);
      });
    });

    describe('setDescribedByIds()', () => {
      it('should join ids into describedBy signal', () => {
        component.setDescribedByIds(['a', 'b']);

        expect(component['describedBy']()).toBe('a b');
      });
    });

    describe('toggle()', () => {
      it('should flip the open state', () => {
        const event = { stopPropagation: vi.fn() } as unknown as MouseEvent;

        component['toggle'](event);
        expect(component['isOpen']()).toBe(true);

        component['toggle'](event);
        expect(component['isOpen']()).toBe(false);
      });
    });
  });
});
