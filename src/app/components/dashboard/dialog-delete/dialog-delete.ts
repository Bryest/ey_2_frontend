import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

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
    readonly dialogRef = inject(MatDialogRef<DialogDelete>);
}