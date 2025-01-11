import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../services/task.service';
import { Status } from '../../status';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconModule, MatButtonModule, EditTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  taskList: Task[];
  filteredTasks: Task[];
  currentStatus: Status = Status.ToDo;

  constructor(private taskService: TaskService, private dialog: MatDialog) 
  {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.taskList = tasks;
      this.filteredTasks = this.filterTasksByStatus(tasks, this.currentStatus);
    });
  }

  private filterTasksByStatus(tasks: Task[], status: Status): Task[] {
    if (status === null) {
      return tasks;
    }
    return tasks.filter(task => task.status === status);
  }

  handleStatusSelected(status) {
    this.filteredTasks = this.taskList.filter((task) => task.status === status);
    this.currentStatus = status;
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
       data: task,
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       console.log('The dialog was closed');
       this.taskService.editTask(task).subscribe(() => {
        console.log('Task edited successfully:');
      });
     });
   }

  deleteTask(task: Task): void {
    console.log('Delete task:', task);
  
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task deleted successfully:');
    }); 

    this.taskService.getTasks().subscribe(tasks => this.taskList = tasks);

    if(this.currentStatus === Status.ToDo || this.currentStatus === Status.InProgress || this.currentStatus === Status.Done){
      this.filteredTasks = this.taskList.filter((task) => task.status === this.currentStatus);
    }
    
    console.log('Tasks:', this.taskList);
  }
}
