console.log('start engine.ts');
import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";

const [FIRST, SECOND, THIRD] = mathPriorities;

// (...)

export const handlingHooks = (stack: ParsedLineType) => {
    let startHook :boolean = false;
    let expression: string[] = [];
    let stackHandlingHook: string[] = [];

    stack.forEach(function (item) {
        console.log('here handlingHooks');
        if (item === '(' && !startHook) {
            startHook = true;
        }
        if (startHook) {
            if (String(item) !== '(' && String(item) !== ')')
                expression.push(String(item));
        } else
            stackHandlingHook.push(String(item));

        if (item === ')') {
            startHook = false;
            let firstPrioritiesRes = firstPrioritiesCalc(expression);
            let secondPrioritiesRes = secondPrioritiesCalc(firstPrioritiesRes);
            let thirdPrioritiesRes = thirdPrioritiesCalc(secondPrioritiesRes);
            stackHandlingHook.push(String(thirdPrioritiesRes));
            expression =[];
        }
    });
    return stackHandlingHook;
};

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (mathOperatorsPriorities[nextItem] === FIRST || item === '^') {

       if ((nextItem === '**') || (nextItem ==='!')) {
          result = [
              ...result.slice(0, -1),
              mathOperators[nextItem](Number(item),0)
          ];
      }
       if ((nextItem === '^') ){
           result.push(nextItem);
       }

        if ((item === '^') ) {
            result = [
                ...result.slice(0, -2),
                mathOperators[item](Number(prevItem), Number(nextItem))
            ];
        }

    } else {
      result.push(nextItem);
    }

    return result;
  }, []);


export const secondPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
    stack.reduce<ParsedLineType>((result, nextItem) => {

        const prevItem = result[result.length - 2];
        const item = result[result.length - 1];

        if (mathOperatorsPriorities[item] === FIRST) {
            throw new TypeError("Unexpected stack!");
        }

        if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
            result = [
                ...result.slice(0, -2),
                mathOperators[item](Number(prevItem), Number(nextItem))
            ];
        } else {
            result.push(nextItem);
        }
        return result;
    }, []);

export const thirdPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
    stack.reduce<ParsedLineType>((result, nextItem, key) => {
        const prevItem = result[result.length - 2];
        const item = result[result.length - 1];
        if (mathOperatorsPriorities[item] === FIRST) {
            throw new TypeError("Unexpected stack!");
        }

        if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
            result = [
                ...result.slice(0, -2),
                mathOperators[item](Number(prevItem), Number(nextItem))
            ];
        }else {
            result.push(nextItem);
        }
        return result;
    }, []);

