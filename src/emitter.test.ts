import { describe, it, expect, mock } from "bun:test";

import { Emitter } from "./emitter";

const emitter = new Emitter();

describe("emitter", () => {
  describe("on", () => {
    it("should register a listener for an event", () => {
      const listener = mock(() => {});
      emitter.on("test-event-1", listener);
      emitter.emit("test-event-1");

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("should allow multiple listeners for the same event", () => {
      const listener1 = mock(() => {});
      const listener2 = mock(() => {});

      emitter.on("test-event-2", listener1);
      emitter.on("test-event-2", listener2);
      emitter.emit("test-event-2");

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe("emit", () => {
    it("should call the listener with the provided arguments", () => {
      const listener = mock(() => {});
      emitter.on("test-event-3", listener);
      emitter.emit("test-event-3", "arg1", "arg2", 123);

      expect(listener).toHaveBeenCalledWith("arg1", "arg2", 123);
    });

    it("should not throw when emitting an event with no listeners", () => {
      expect(() => emitter.emit("non-existent-event")).not.toThrow();
    });

    it("should call listeners multiple times when event is emitted multiple times", () => {
      const listener = mock(() => {});
      emitter.on("test-event-4", listener);

      emitter.emit("test-event-4");
      emitter.emit("test-event-4");
      emitter.emit("test-event-4");

      expect(listener).toHaveBeenCalledTimes(3);
    });

    it("should only call listeners for the specific event", () => {
      const listener1 = mock(() => {});
      const listener2 = mock(() => {});

      emitter.on("event-a", listener1);
      emitter.on("event-b", listener2);

      emitter.emit("event-a");

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).not.toHaveBeenCalled();
    });
  });
});
