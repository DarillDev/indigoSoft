import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUser } from '@shared';
import { ModalContainerComponent } from '@ui-kit/modal';

@Component({
  selector: 'feature-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ModalContainerComponent],
})
export class EditUserDialogComponent {
  protected readonly data = inject<IUser>(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<IUser>);

  protected readonly form = new FormGroup({
    name: new FormControl(this.data.name, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl(this.data.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close({ ...this.data, ...this.form.getRawValue() });
  }
}
