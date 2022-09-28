import isMonotonic from "../src/index";

test("example 1", () => {
  expect(isMonotonic([1, 2, 2, 3])).toBe(true);
});

test("example 2", () => {
  expect(isMonotonic([6, 5, 4, 4])).toBe(true);
});

test("example 3", () => {
  expect(isMonotonic([1, 3, 2])).toBe(false);
});

test("example 4", () => {
  expect(isMonotonic([1, 1, 3, 4])).toBe(true);
});

test("example 5", () => {
  expect(isMonotonic([1, 1, 0, -1])).toBe(true);
});

test("example 6", () => {
  expect(isMonotonic([1, 2, 3, -1])).toBe(false);
});
