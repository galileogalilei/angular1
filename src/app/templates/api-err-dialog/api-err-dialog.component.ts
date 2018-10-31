import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-api-err-dialog',
    templateUrl: './api-err-dialog.component.html',
    styleUrls: ['./api-err-dialog.component.css']
})
export class ApiErrDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ApiErrDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}
