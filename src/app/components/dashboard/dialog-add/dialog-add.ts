import { CommonModule, NgIf, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Supplier } from "../../../models/Supplier";
import { SupplierValidator } from "../FormValidator/FormValidator";

@Component({
    selector: 'dialog-add',
    templateUrl: 'dialog-add.html',
    styleUrl: 'dialog-add.css',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule,
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAdd implements OnInit {
    supplierForm = inject(SupplierValidator).supplierForm;

    readonly data = inject<Supplier>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DialogAdd>);

    ngOnInit(): void {
        this.supplierForm.patchValue({
            businessName: '',
            tradeName: '',
            taxId: '',
            phoneNumber: '',
            email: '',
            website: '',
            physicalAddress: '',
            country: '',
            annualBilling: ''
        });

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close(this.supplierForm.value);
    }
}