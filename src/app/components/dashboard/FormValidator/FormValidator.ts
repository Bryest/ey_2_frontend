import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SupplierValidator {
    private _supplierForm = new FormGroup({
        businessName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
        tradeName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
        taxId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\+?[0-9]*$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        website: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
        physicalAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
        country: new FormControl('', [Validators.required]),
        annualBilling: new FormControl('', [Validators.required, Validators.pattern('^[0-9,]*$')]),
    });

    public get supplierForm(): FormGroup {
        return this._supplierForm;
    }

    public set supplierForm(value) {
        this._supplierForm = value;
    }
}
