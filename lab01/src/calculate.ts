import { Dict, MatchResult, Semantics } from "ohm-js";
import grammar, { AddMulActionDict } from "./addmul.ohm-bundle";

export const addMulSemantics: AddMulSemantics = grammar.createSemantics() as AddMulSemantics;

const addMulCalc = {
    Exp_add(left, op, right) {
        const leftVal = left.calculate();
        const rightVal = right.calculate();
        return leftVal + rightVal;
    },
    Exp_single(factor) {
        return factor.calculate();
    },
    Factor_num(num) {
        return parseInt(this.sourceString, 10);
    }

} satisfies AddMulActionDict<number>

addMulSemantics.addOperation<Number>("calculate()", addMulCalc);

interface AddMulDict  extends Dict {
    calculate(): number;
}

interface AddMulSemantics extends Semantics
{
    (match: MatchResult): AddMulDict;
}

const testExpression = "1 + 1 + 1 + 1 + 1";
const match = grammar.match(testExpression);

if (match.failed()) {
    console.error(match.message);
} else {
    const result = addMulSemantics(match);
    console.log(result.calculate()); 
}