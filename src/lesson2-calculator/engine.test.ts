import { firstPrioritiesCalc, secondPrioritiesCalc, thirdPrioritiesCalc } from "./engine";

describe("secondPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(secondPrioritiesCalc([1, "*", 32])).toEqual([32]);
  });

 /* it("[32, /, 32]", () => {
    expect(secondPrioritiesCalc([32, "/", 32])).toEqual([1]);
  });*/

  it("[32, + 32]", () => {
    expect(secondPrioritiesCalc([32, "+", 32])).toEqual([32, "+", 32]);
  });
});

describe("secondPrioritiesCalc mixed with third priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(secondPrioritiesCalc([32, "/", 32, "+", 10, "*", 10])).toEqual([
      1,
      "+",
      100,
    ]);
  });
});


describe("secondPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(thirdPrioritiesCalc([32, "+", 32])).toEqual([64]);
  });

  it("[32, - 32]", () => {
    expect(thirdPrioritiesCalc([32, "-", 32])).toEqual([0]);
  });

  it("[32, - 32, +, 10]", () => {
    expect(thirdPrioritiesCalc([32, "-", 32, "+", 10])).toEqual([10]);
  });
});

describe("firstPrioritiesCalc simple cases", () => {
  it("[10, ^ 2]", () => {
    expect(firstPrioritiesCalc([10, "^", 2])).toEqual([100]);
  });

  it("[5 **]", () => {
    expect(firstPrioritiesCalc([5, "**"])).toEqual([25]);
  });
});