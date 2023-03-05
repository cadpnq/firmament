import { SchedulerNoTasksError } from '../errors/SchedulerNoTasksError';
import type { ScheduledTask } from './ScheduledTask';

export class Scheduler {
  tasks: ScheduledTask[] = [];
  lastExecution = 0;
  running = false;
  timer?: NodeJS.Timeout;

  registerTask(task: ScheduledTask) {
    if (this.running) throw new Error();
    this.scheduleTask(task);
  }

  scheduleTask(task: ScheduledTask) {
    if (this.tasks.length === 0) {
      this.tasks.push(task);
      return;
    }

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].nextExecution > task.nextExecution) {
        this.tasks.splice(i, 0, task);
        return;
      }
    }

    this.tasks.push(task);
  }

  executeTasks() {
    const now = performance.now();
    while (this.tasks[0]?.nextExecution <= now) {
      const task = this.tasks.shift();
      if (!task) break;
      task.onRun(now - task.lastExecution);
      task.nextExecution = now + (task.interval - (now - task.nextExecution));
      task.lastExecution = now;
      this.scheduleTask(task);
    }
    const nextExecution = this.tasks[0].nextExecution;
    const delay = nextExecution - now;
    this.timer = setTimeout(() => {
      this.executeTasks();
    }, delay);
  }

  start() {
    if (this.running) return;
    if (this.tasks.length === 0) throw new SchedulerNoTasksError();
    const now = performance.now();
    this.tasks.forEach((task) => {
      task.lastExecution = now;
      task.nextExecution = now;
    });
    this.running = true;
    this.executeTasks();
  }
  stop() {
    if (!this.running) return;
    this.running = false;
    clearTimeout(this.timer);
  }
}
