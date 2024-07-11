import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { Supplier } from "../../../models/Supplier";
import { DialogScreeningTable } from "../dialog-screening-table/dialog-screening-table";

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
    readonly data = inject<Supplier>(MAT_DIALOG_DATA)
    readonly dialogRef = inject(MatDialogRef<DialogScreening>);

    readonly screeningDialogTable = inject(MatDialog);

    onNoClick(): void {
        this.dialogRef.close();
    }

    openScreeningTableDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
        this.screeningDialogTable.open(DialogScreeningTable, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { businessName: this.data.businessName },
        },)
    }
}