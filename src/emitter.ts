export class EventEmitter extends EventTarget {
  constructor(private name: string) {
    super();
    this.name = name;
  }

  postMessage(message: string) {
    const msgEvent = new CustomEvent("ms", {
      detail: { message, deta: { value: 450 } },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(msgEvent);
  }

  triggerAlert(data: { message: string; deta: { value: number } }) {
    const msgEvent = new CustomEvent("alert", {
      detail: data,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(msgEvent);
  }
}

export class CustomEventEmitter {
  private events: Map<string, ((event: CustomEvent) => void)[]>;
  constructor() {
    this.events = new Map();
  }

  on(eventName: string, callback: (event: CustomEvent) => void) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)?.push(callback);
    return () => {
      this.off(eventName, callback);
    };
  }

  off(eventName: string, callback: (event: CustomEvent) => void) {
    return this.events.get(eventName)?.pop();
  }

  emit(eventName: string, ...data: any[]) {
    const event = new CustomEvent(eventName, { detail: data });
    this.events.get(eventName)?.forEach((cb) => cb(event));
  }
}

const buf = new ArrayBuffer(8);
buf.byteLength; // => 8

const slice = buf.slice(0, 4); // returns new ArrayBuffer
slice.byteLength; // => 4
