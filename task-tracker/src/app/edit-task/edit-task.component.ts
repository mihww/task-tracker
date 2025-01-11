import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { Task } from '../task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})

export class EditTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  @ViewChild('descriptionArea') descriptionArea: ElementRef;
  @ViewChild('titleArea') titleArea: ElementRef;


  save(): void{
    this.data.name = this.titleArea.nativeElement.value;
    this.data.description = this.descriptionArea.nativeElement.value; 
    
    this.dialogRef.close();
  }

  cancel(): void{
    this.dialogRef.close();
  }
}
