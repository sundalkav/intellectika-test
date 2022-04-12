import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '@interfaces/task.interface';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @Output() onAdd: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() textSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input() maxId;
  taskName = '';
  searchText = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  addTask() {
    if (this.taskName.trim()) {
      const task: Task = {
        id: this.maxId + 1,
        task: this.taskName,
        isCompleted: false
      };
      this.onAdd.emit(task);
      this.taskName = '';
    }
  }

  onTyping(searchText: string) {
    this.textSearch.emit(searchText);
  }

}
