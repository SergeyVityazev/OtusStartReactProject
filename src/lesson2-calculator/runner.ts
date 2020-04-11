import { parser } from "./parser";

import { firstPrioritiesCalc, secondPrioritiesCalc , thirdPrioritiesCalc, handlingHooks } from "./engine";

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  // handling hooks
  const handlingHooksRes =  handlingHooks(stack);

  const firstPrioritiesRes = firstPrioritiesCalc(handlingHooksRes);

  const secondPrioritiesRes = secondPrioritiesCalc(firstPrioritiesRes);

  const thirdPrioritiesRes = thirdPrioritiesCalc(secondPrioritiesRes);

  return Number(thirdPrioritiesRes);
};
