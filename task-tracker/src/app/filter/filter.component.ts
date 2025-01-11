import { Component, OnInit } from '@angular/core';
import { Status } from '../../status';
import { CommonModule } from '@angular/common';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTabsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

export class FilterComponent  {
  statuses = Object.values(Status);
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
 
  selectStatus(status: Status) {
    this.statusSelected.emit(status)
  }
}
