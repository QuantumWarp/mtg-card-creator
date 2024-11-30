export class Semaphore {
  constructor(
    private locked = false,
    private waitQueue: ((value?: unknown) => void)[] = [],
    private delay = 200,
  ) { }

  async acquire() {
    if (this.locked) {
      await new Promise(resolve => this.waitQueue.push(resolve));
    }
  
    this.locked = true;
  }

  release() {
    setTimeout(() => this.delayedRelease(), this.delay);
  }

  private delayedRelease() {
    this.locked = false;

    if (this.waitQueue.length > 0) {
      const nextProcess = this.waitQueue.shift();
      if (nextProcess) nextProcess();
    }
  }
}
