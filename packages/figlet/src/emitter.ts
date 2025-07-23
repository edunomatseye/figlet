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

const view = new DataView(buf);
view.setInt32(0, 123456);
view.getInt32(0); // => 123456

const view2 = new DataView(slice);
view2.getInt32(0); // => 123456

const view3 = new DataView(slice);
view3.setInt32(0, 654321);
view3.getInt32(0); // => 654321

const rs = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode("Hello, world!"));
    controller.close();
  },
});

const reader = rs.getReader();
const { value, done } = await reader.read();
console.log(value); // => "Hello, world!"
