package tokens;

import utils.MathArithmetic;

/**
 * Class for an operator token. It contains a function that will be used to evaluate the expression.
 * The function is passed as a parameter to the constructor.
 */
public class Operator implements Token {
    /**
     * The addition operator. Adds two numbers together
     */
    public static final Operator ADDITION = new Operator(Integer::sum);
    /**
     * The multiplication operator. Multiplies the two numbers together
     */
    public static final Operator MULTIPLICATION = new Operator((a, b) -> a * b);


    private final MathArithmetic<Integer> function;

    public Operator(MathArithmetic<Integer> function) {
        this.function = function;
    }

    /**
     * Evaluates the expression using the function
     * @param left The left operand
     * @param right The right operand
     * @return The result of the expression
     * @see MathArithmetic#apply(Object, Object)
     */
    public Integer evaluate(Integer left, Integer right) {
        return function.apply(left, right);
    }
}
