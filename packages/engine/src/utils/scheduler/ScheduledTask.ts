export class ScheduledTask {
  // TODO: these should probably live in some metadata in the scheduler proper
  interval = 0;
  priority = 0;
  lastExecution = 0;
  nextExecution = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onRun(dt: number) {}
}
