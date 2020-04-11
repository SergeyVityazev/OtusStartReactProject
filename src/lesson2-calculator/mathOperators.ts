export type ScalarOperationType = (first: number, second: number) => number;

export const square: ScalarOperationType = (
    first: number
): number => Math.pow(first, 2);

export const extent: ScalarOperationType = (
    first: number,
    second: number
): number => Math.pow(first, second);

export const factorial: ScalarOperationType = (
    first: number
): number => {
  let factorial = 0;
  let buferValue = 0;
   if (first!==0) {
    for (let i = first-1; i > 0; i--) {

      if (buferValue ===0) {
        factorial = first * i;
        buferValue = factorial;
      } else {
        factorial = buferValue * i;
        buferValue = factorial;
      }

    }
    return factorial;
  } else
    return 0;
};

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const mathOperators: { [key: string]: ScalarOperationType } = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "**": square,
  "^": extent,
  "!": factorial
};

export const mathPriorities: number[] = [1, 2, 3];

const [FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "**": FIRST,
  "^": FIRST,
  "!": FIRST,
  "/": SECOND,
  "*": SECOND,
  "+": THIRD,
  "-": THIRD
};
