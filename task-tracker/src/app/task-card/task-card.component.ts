import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../task';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '../../status';
import { MatOption } from '@angular/material/select';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgForOf, MatOption, MatProgressBarModule, MatButtonModule, MatSelectModule, MatDividerModule, MatCardModule, MatIconModule, EditTaskComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})

export class TaskCardComponent implements OnInit{
  @Input() task: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  statusOptions: string[];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.statusOptions = Object.values(Status).filter(key => isNaN(Number(Status[key])));
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
       data: task,
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       console.log('The dialog was closed: ', result);
       
       this.taskService.editTask(task).subscribe(() => {
        console.log('Task edited successfully');
      });
     });
   }
   
   onStatusChange(task: Task): void {
    this.taskService.editTask(task).subscribe(() => {
      console.log('Task status updated successfully');
    });
  }

  deleteTask(task: Task) {
    console.log('Delete task:', task);
  }
}
