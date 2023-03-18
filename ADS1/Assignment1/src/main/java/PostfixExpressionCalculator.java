import set.StackADS;
import set.StackImpl;
import tokens.Operand;
import tokens.Operator;
import tokens.Token;

import java.util.List;

public class PostfixExpressionCalculator {
    /**
     * Evaluates a postfix expression
     * @param tokenList The postfix expression
     * @return The result of the expression
     * @throws IllegalStateException If the expression is invalid
     * @throws NullPointerException If one of the token or it's value is null
     * @throws IllegalArgumentException If one of the tokens are invalid
     */
    public static int evaluateExpression(List<Token> tokenList){
        // creating the custom stack
        StackADS<Integer> stack = new StackImpl<>();

        // loop through the tokens
        for (Token token : tokenList) {
            // if the token is an operand, push it to the stack
            if(token instanceof Operand operand) {
                int value = operand.getValue();
                stack.push(value);
            }
            // if the token is an operator, pop the last two operands from the stack,
            // evaluate the expression and push the result to the stack
            else if(token instanceof Operator operator) {
                int right = stack.pop();
                int left = stack.pop();

                // the 'operator.evaluate' method will calculate the result of the expression
                int result = operator.evaluate(left, right);
                stack.push(result);
            }

            else if(token == null)
                throw new NullPointerException("Token is null");
            else
                throw new IllegalArgumentException("Invalid token");
        }

        int result = stack.pop();

        if(!stack.isEmpty())
            throw new IllegalStateException("Invalid expression");

        return result;
    }
}
