import {
  describe,
  it,
  expect,
  mock,
  test,
  beforeEach,
  afterEach,
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
