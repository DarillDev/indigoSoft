import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'ds-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent {
  public readonly title = input.required<string>();

  private readonly dialogRef = inject(DialogRef);

  protected close(): void {
    this.dialogRef.close();
  }
}
