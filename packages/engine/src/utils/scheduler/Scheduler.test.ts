import { SchedulerNoTasksError } from '../errors/SchedulerNoTasksError';
import { ScheduledTask } from './ScheduledTask';
import { Scheduler } from './Scheduler';

jest.mock('./ScheduledTask');
jest.useFakeTimers({ doNotFake: ['performance'] });

const mockTask = (interval: number, priority = 0) => {
  const task = new ScheduledTask();
  task.interval = interval;
  task.priority = priority;
  return task;
};

describe('Scheduler', () => {
  describe('start', () => {
    describe('when the scheduler has no tasks', () => {
      it('should throw', () => {
        const scheduler = new Scheduler();
        expect(() => scheduler.start()).toThrow(SchedulerNoTasksError);
      });
    });
  });
  describe('normal execution', () => {
    describe('when the scheduler has only one task', () => {
      it.skip('gets called at the specified interval', () => {
        const scheduler = new Scheduler();
        const task = mockTask(100);
        scheduler.registerTask(task);
        scheduler.start();
        jest.advanceTimersByTime(1050);
        expect(task.onRun).toHaveBeenCalledTimes(10);
        scheduler.stop();
      });
    });
  });
});
