export class Emitter {
  private events: Record<string, ((...args: any[]) => void)[]> = {};

  on(event: string, listener: (...args: any[]) => void) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(listener);
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach((listener) => listener(...args));
  }
}
