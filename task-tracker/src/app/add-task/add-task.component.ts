import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../services/task.service';
import { Task } from '../task';
import { Status } from '../../status';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})

export class AddTaskComponent {
  taskName: string;
  taskDescription: string;
  taskAssignment: string

  constructor(private router: Router, private taskService: TaskService) {
    this.taskName = '';
    this.taskDescription = '';
    this.taskAssignment = '';
  }

  onSubmit() {
    console.log('Task Name:', this.taskName);
    console.log('Description:', this.taskDescription);
    console.log('AssignedTo:', this.taskAssignment);

    if (!this.taskName || !this.taskDescription || !this.taskAssignment) {
      console.log('Please fill in all fields.');
      return;
    }

    const newTask: Task = <Task>{
      name: this.taskName,
      description: this.taskDescription,
      assignedTo: this.taskAssignment,
      status: Status.ToDo  
    };

    this.taskService.addTask(newTask)
      .subscribe(task => {
        console.log('Task added successfully:', task);
        this.router.navigate(['/']);
      });
  }
}