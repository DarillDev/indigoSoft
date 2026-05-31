import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ERole, IUser } from '@shared';
import { ModalContainerComponent } from '@ui-kit/modal';
import { InputComponent, SelectComponent, SelectOption } from '@ui-kit/forms';

@Component({
  selector: 'feature-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ModalContainerComponent, InputComponent, SelectComponent],
})
export class EditUserDialogComponent {
  protected readonly data = inject<IUser>(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<IUser>);

  protected readonly roleOptions: SelectOption<ERole>[] = [
    { value: ERole.Admin, label: 'Admin' },
    { value: ERole.Client, label: 'Client' },
    { value: ERole.Guest, label: 'Guest' },
    { value: ERole.UnknownUser, label: 'Unknown User' },
  ];

  protected readonly form = new FormGroup({
    name: new FormControl(this.data.name, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl(this.data.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    role: new FormControl(this.data.role, { nonNullable: true, validators: [Validators.required] }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({ ...this.data, ...this.form.getRawValue() });
  }
}
