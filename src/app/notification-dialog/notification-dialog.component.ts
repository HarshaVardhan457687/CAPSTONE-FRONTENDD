import { Component, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent {
  message: string;
  success: boolean;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )  {
    this.message = data.message;
    this.success = data.success;

    // Automatically close the dialog after 3 seconds
    setTimeout(() => {
      this.close();
    }, 3000);  // 3 seconds delay
  }

  close(): void {
    this.dialogRef.close();
  } 
}
