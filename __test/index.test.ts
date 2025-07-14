import {
  describe,
  it,
  expect,
  mock,
  test,
  beforeEach,
  afterEach,
  jest,
} from "bun:test";

describe("Bun server", () => {
  beforeEach(() => {
    console.log("beforeEach");
  });
  afterEach(() => {
    console.log("afterEach");
    mock.restore();
  });
  test("for random function", () => {
    const random = mock(() => 42);
    expect(random()).toBe(42);
    expect(random.mock.calls).toEqual([[]]);
    expect(random.mock.results).toEqual([{ type: "return", value: 42 }]);
  });
});

test("just like in jest", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
  expect(new Date().getFullYear()).toBe(2020);
  jest.useRealTimers();
  expect(new Date().getFullYear()).toBeGreaterThan(2020);
});

test("unlike in jest", () => {
  const OriginalDate = Date;
  jest.useFakeTimers();
  if (typeof Bun === "undefined") {
    // In Jest, the Date constructor changes
    // That can cause all sorts of bugs because suddenly Date !== Date before the test.
    expect(Date).not.toBe(OriginalDate);
    expect(Date.now).not.toBe(OriginalDate.now);
  } else {
    // In bun:test, Date constructor does not change when you useFakeTimers
    expect(Date).toBe(OriginalDate);
    expect(Date.now).toBe(OriginalDate.now);
  }
});

test("Runtime behaviour of bun:test", () => {
  expect(process.env.NODE_ENV).toBe("test");
});
