import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  function inputEvent(value: string): Event {
    const input = document.createElement('input');
    input.value = value;
    return { target: input } as unknown as Event;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [InputFieldComponent] });
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Model', () => {
    describe('writeValue()', () => {
      it('should set the value signal', () => {
        component.writeValue('hello');

        expect(component['value']()).toBe('hello');
      });

      it('should fall back to empty string for nullish value', () => {
        component.writeValue(null as unknown as string);

        expect(component['value']()).toBe('');
      });
    });

    describe('onValueChange()', () => {
      it('should propagate value and mark as touched', () => {
        const onChange = vi.fn();
        const onTouched = vi.fn();
        component.registerOnChange(onChange);
        component.registerOnTouched(onTouched);

        component.onValueChange(inputEvent('typed'));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('typed');
        expect(onTouched).toHaveBeenCalledTimes(1);
        expect(onTouched).toHaveBeenCalledWith();
      });
    });
  });
});
