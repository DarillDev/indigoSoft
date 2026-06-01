import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ERole, IUser } from '@shared/models';
import { ModalContainerComponent } from '@shared/ds/modal';
import { InputFieldComponent } from '@shared/ds/inputs/input-field';
import { SelectFieldComponent, IDsSelectOption } from '@shared/ds/selects';
import { IUserForm } from './interfaces/user-form.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'feature-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ModalContainerComponent,
    InputFieldComponent,
    SelectFieldComponent,
  ],
})
export class EditUserDialogComponent {
  private readonly dialogData = inject<IUser>(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<IUser>);
  private readonly nfb = inject(FormBuilder).nonNullable;

  protected readonly roleOptions: IDsSelectOption<ERole>[] = [
    { id: ERole.Admin, value: ERole.Admin, label: 'Admin' },
    { id: ERole.Client, value: ERole.Client, label: 'Client' },
    { id: ERole.Guest, value: ERole.Guest, label: 'Guest' },
    { id: ERole.UnknownUser, value: ERole.UnknownUser, label: 'Unknown User' },
  ];

  protected readonly form = this.nfb.group<IUserForm>({
    name: this.nfb.control(this.dialogData.name, { validators: Validators.required }),
    email: this.nfb.control(this.dialogData.email, {
      validators: [Validators.required, Validators.email],
    }),
    role: this.nfb.control(this.dialogData.role, { validators: Validators.required }),
    age: this.nfb.control(this.dialogData.age, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  protected readonly canSave = toSignal(
    this.form.statusChanges.pipe(map((status) => status === 'VALID')),
    { initialValue: this.form.valid },
  );

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({ ...this.dialogData, ...this.form.getRawValue() });
  }

  protected close(): void {
    this.dialogRef.close();
  }
}
