import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root', // ta konfiguracja mówi angularowi, że ten serwis może być wstrzyknięty wszędzie w aplikacji
}) //ten dekrator mówi angularowi, że ta klasa może być wstrzykiwana w innych częściach aplikacji
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  updateTakskStatus(tasksId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === tasksId ? { ...task, status: newStatus } : task
      )
    );
  }
}
