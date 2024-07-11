import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Supplier } from "../../../models/Supplier";

@Component({
    selector: 'dialog-delete',
    templateUrl: 'dialog-delete.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDelete {
    readonly data = inject<Supplier>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DialogDelete>);

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close(this.data.id);
    }
}