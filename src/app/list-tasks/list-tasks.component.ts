import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {Task} from '@interfaces/task.interface';
import {Subscription} from 'rxjs';
import {ModalService} from '../services/modal.service';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent {

  @Input() tasks: Task[];
  @Input() searchText;
  @ViewChildren('elementName') elementName: QueryList<ElementRef>;
  @ViewChild('modal', {read: ViewContainerRef}) entry!: ViewContainerRef;
  @Output() onEdit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onDel: EventEmitter<number> = new EventEmitter<number>();

  prevTask: Task[] = [];
  sub!: Subscription;


  constructor(private modalService: ModalService) {
  }

  edit(ev: any, i, id): void {
    const arr = this.elementName.toArray();
    const taskInput = arr[i].nativeElement.querySelector('.task-input');
    const taskCheBox = arr[i].nativeElement.querySelector('.task-checkbox');
    const taskActionDel = arr[i].nativeElement.querySelector('.delete');
    this.addStyleActive(ev, taskInput, taskCheBox, taskActionDel);
    this.tasks[i].isEditing = true;
    this.prevTask.unshift({id: id, task: taskInput.value, isCompleted: taskCheBox.checked});
  }

  editActive(ev: any, i, id) {
    const arr = this.elementName.toArray();
    const taskInput = arr[i].nativeElement.querySelector('.task-input');
    const taskCheBox = arr[i].nativeElement.querySelector('.task-checkbox');
    const taskActionDel = arr[i].nativeElement.querySelector('.delete');
    if (taskInput.value.trim()) {
      const task: Task = {
        id: id,
        task: taskInput.value,
        isCompleted: taskCheBox.checked
      };
      this.onEdit.emit(task);
    }
    this.addStyleDefault(ev, taskInput, taskCheBox, taskActionDel);
    this.tasks[i].isEditing = false;
  }

  delete(ev: any, i: number, id: number) {
    this.openModal(id);
  }

  deleteActive(ev: any, i: number, id: any) {
    const arr = this.elementName.toArray();
    const taskInput = arr[i].nativeElement.querySelector('.task-input');
    const taskCheBox = arr[i].nativeElement.querySelector('.task-checkbox');
    this.prevTask.forEach((item, index, tasks) => {
      if (item.id == id) {
        if (item.task !== taskInput.value || item.isCompleted !== taskCheBox.checked) {
          taskInput.value = item.task;
          taskCheBox.checked = item.isCompleted;
          tasks.splice(index, 1);
        }
      }
    });
  }

  openModal(id) {
    this.sub = this.modalService
      .openModal(this.entry, id)
      .subscribe((v) => {
        this.onDel.emit(id);
      });
  }

  addStyleActive(ev: any, taskInput: any, taskCheBox: any, taskActionDel: any) {
    taskInput.removeAttribute('disabled');
    taskInput.classList.remove('task-input-default');
    taskInput.classList.add('task-input-active');
    taskCheBox.removeAttribute('disabled');
  }

  addStyleDefault(ev: any, taskInput: any, taskChekBox: any, taskActionDel: any) {
    taskInput.classList.remove('task-input-active');
    taskInput.classList.add('task-input-default');
    taskInput.setAttribute('disabled', 'disabled');
    taskChekBox.setAttribute('disabled', 'disabled');
  }

}
