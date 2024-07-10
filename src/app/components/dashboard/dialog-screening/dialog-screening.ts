import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";

@Component({
    selector: 'dialog-screening',
    templateUrl: 'dialog-screening.html',
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
export class DialogScreening {
    readonly dialogRef = inject(MatDialogRef<DialogScreening>);
}