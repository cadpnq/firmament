export class SchedulerNoTasksError extends Error {
  constructor() {
    super('Scheduler has no tasks');
  }
}
