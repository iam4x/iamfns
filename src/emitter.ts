export class Emitter {
  private events: Record<string, ((...args: any[]) => void)[]> = {};

  on(event: string, listener: (...args: any[]) => void) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(listener);
  }

  off(event: string, listener?: (...args: any[]) => void) {
    if (listener) {
      this.events[event] = this.events[event]?.filter((l) => l !== listener);
    } else {
      this.events[event] = [];
    }
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach((listener) => listener(...args));
  }
}
