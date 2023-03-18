import tokens.Operand;
import tokens.Operator;
import tokens.Token;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Creating the expression 6 5 2 3 + 8 * + 3 + *

        Token[] tokens = {
                Operand.from(6),
                Operand.from(5),
                Operand.from(2),
                Operand.from(3),
                Operator.ADDITION,
                Operand.from(8),
                Operator.MULTIPLICATION,
                Operator.ADDITION,
                Operand.from(3),
                Operator.ADDITION,
                Operator.MULTIPLICATION,
        };

        // Evaluating the expression
        int result = PostfixExpressionCalculator.evaluateExpression(List.of(tokens));

        // Printing the result (the result should be 288)
        System.out.println("Result (should be 288): " + result);
    }
}
