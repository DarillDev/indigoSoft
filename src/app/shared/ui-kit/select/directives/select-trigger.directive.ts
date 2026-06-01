import { Directive } from '@angular/core';
import { SELECT_TRIGGER } from '../config/select-trigger.token';

@Directive({
  selector: '[uiKitSelectTrigger], ui-kit-select-trigger',
  providers: [{ provide: SELECT_TRIGGER, useExisting: SelectTriggerDirective }],
})
export class SelectTriggerDirective {}
