import { describe, it, expect, jest, beforeEach } from "bun:test";
// Import the emitter classes
import { EventEmitter, CustomEventEmitter } from "../src/emitter";

beforeEach(() => {
  //   EventEmitter.prototype.addEventListener = jest.fn();
  //   EventEmitter.prototype.removeEventListener = jest.fn();
  //   CustomEventEmitter.prototype.on = jest.fn();
  //   CustomEventEmitter.prototype.off = jest.fn();
  //   CustomEventEmitter.prototype.emit = jest.fn();
  let called = false;
});

describe("EventEmitter", () => {
  it("should dispatch a 'ms' event with correct detail", () => {
    const emitter = new EventEmitter("test");
    let received: any = null;
    emitter.addEventListener("ms", (event: Event) => {
      received = (event as CustomEvent).detail;
    });
    emitter.postMessage("hello");
    expect(received).toEqual({ message: "hello", deta: { value: 450 } });
  });

  it("should dispatch an 'alert' event with correct detail", () => {
    const emitter = new EventEmitter("test");
    let received: any = null;
    emitter.addEventListener("alert", (event: Event) => {
      received = (event as CustomEvent).detail;
    });
    emitter.triggerAlert({ message: "alert!", deta: { value: 123 } });
    expect(received).toEqual({ message: "alert!", deta: { value: 123 } });
  });
});

describe("CustomEventEmitter", () => {
  it("should call listeners on emit", () => {
    const emitter = new CustomEventEmitter();
    let called = false;
    emitter.on("test", (event) => {
      called = true;
      expect(event.detail).toEqual([1, 2, 3]);
    });
    emitter.emit("test", 1, 2, 3);
    expect(called).toBe(true);
  });

  it("should remove listeners with off", () => {
    const emitter = new CustomEventEmitter();
    let called = true;
    function cb() {
      called = false;
    }
    emitter.on("test", cb);
    emitter.off("test", cb);
    emitter.on("test", cb);
    emitter.off("test", cb);
    emitter.off("test", cb);
    emitter.emit("test", 144);
    //expect(cb).toHaveBeenCalled();
    expect(called).toBe(true);
  });
});
