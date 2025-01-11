import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [MatProgressBarModule, MatButtonModule, MatDividerModule, MatCardModule, CommonModule, TaskCardComponent],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss'
})

export class TaskGridComponent implements OnInit{
  taskList: Task[];
  
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  constructor(private taskService: TaskService) 
  {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.taskList = tasks);
  }

  deleteTaskFromGrid(task: Task) {
    console.log('Delete task:', task);
    
    this.taskService.deleteTask(task).subscribe(() => {
      console.log('Task deleted successfully:');
    });

    this.taskService.getTasks().subscribe(tasks => this.taskList = tasks);
  }
}
