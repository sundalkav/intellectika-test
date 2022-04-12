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
    ev.target.classList.forEach(a => {
      if (a === 'edit') {
        this.addStyleActive(ev, taskInput, taskCheBox, taskActionDel);
        this.prevTask.unshift({id: id, task: taskInput.value, isCompleted: taskCheBox.checked});
      } else if (a === 'edit-active') {
        this.addStyleDefault(ev, taskInput, taskCheBox, taskActionDel);
        if (taskInput.value.trim()) {
          const task: Task = {
            id: id,
            task: taskInput.value,
            isCompleted: taskCheBox.checked
          };
          this.onEdit.emit(task);
        }
      }
    });
  }

  delete(ev: any, i: number, id: number) {
    const arr = this.elementName.toArray();
    const taskInput = arr[i].nativeElement.querySelector('.task-input');
    const taskCheBox = arr[i].nativeElement.querySelector('.task-checkbox');
    const taskActionDel = arr[i].nativeElement.querySelector('.delete');
    ev.target.classList.forEach(a => {
      if (a === 'delete-active') {
        this.prevTask.forEach((item, index, tasks) => {
          if (item.id == id) {
            if (item.task !== taskInput.value || item.isCompleted !== taskCheBox.checked) {
              taskInput.value = item.task;
              taskCheBox.checked = item.isCompleted;
              tasks.splice(index, 1);
            }
          }
        });
      } else if (a === 'delete-default') {
        this.openModal(id);
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
    ev.target.classList.remove('edit');
    ev.target.classList.add('edit-active');
    taskInput.removeAttribute('disabled');
    taskInput.classList.remove('task-input-default');
    taskInput.classList.add('task-input-active');
    taskCheBox.removeAttribute('disabled');
    taskActionDel.classList.remove('delete-default');
    taskActionDel.classList.add('delete-active');
  }

  addStyleDefault(ev: any, taskInput: any, taskChekBox: any, taskActionDel: any) {
    ev.target.classList.remove('edit-active');
    ev.target.classList.add('edit');
    taskInput.classList.remove('task-input-active');
    taskInput.classList.add('task-input-default');
    taskInput.setAttribute('disabled', 'disabled');
    taskChekBox.setAttribute('disabled', 'disabled');
    taskActionDel.classList.remove('delete-active');
    taskActionDel.classList.add('delete-default');
  }

}
