import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { Supplier } from "../../../models/Supplier";

@Component({
    selector: 'dialog-detail',
    templateUrl: 'dialog-detail.html',
    styleUrl: 'dialog-detail.css',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatListModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDetail {
    readonly data = inject<Supplier>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DialogDetail>);
}
