import {Component, OnInit} from '@angular/core';
import {Task} from '@interfaces/task.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpService} from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  tasks: Task[];
  maxId = 1;
  searchText = '';

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.httpService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        this.maxId = this.httpService.findMax(data).id;
      }
    );
  }

  addTask(task: Task) {
    this.httpService.addTask(task).subscribe((a: Task) => {
      this.tasks.unshift(a);
      this.maxId = a.id;
    }),
      (error: HttpErrorResponse) => {
        console.log(error.message);
      };
  }

  editTask(task: Task) {
    this.httpService.editTask(task).subscribe(a => {
    });
  }

  delTask(id: number) {
    this.httpService.deleteTask(id).subscribe(a => {
      this.tasks.forEach((item, index, tasks) => {
        if (item.id == id) {
          this.tasks.splice(index, 1);
        }
      });
    });
  }

  findText($event: string) {
    this.searchText = $event;
  }
}
