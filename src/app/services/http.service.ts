import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Task} from '@interfaces/task.interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private httpClient: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.base_url + 'tasks');
  }

  addTask(task: Task) {
    return this.httpClient.post(environment.base_url + 'tasks', task);
  }

  editTask(task: Task) {
    return this.httpClient.put(environment.base_url + 'tasks/' + task.id, {
      task: task.task,
      isCompleted: task.isCompleted
    });
  }

  deleteTask(id) {
    return this.httpClient.delete(environment.base_url + 'tasks/' + id);
  }

  findMax(list: Task[]): Task | undefined {
    if (!list.length) {
      return undefined;
    }
    return list.reduce((max, task) => task.id > max.id ? task : max)
  }

}
