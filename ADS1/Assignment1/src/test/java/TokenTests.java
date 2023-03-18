import org.junit.jupiter.api.Test;
import tokens.Operand;
import tokens.Operator;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Tests for the Token interface and its subclasses
 */
public class TokenTests {

    @Test
    void testOperandFive() {
        Operand operand = new Operand(5);
        assertEquals(5, operand.getValue());
    }

    @Test
    void testOperandZero() {
        Operand operand = new Operand(0);
        assertEquals(0, operand.getValue());
    }

    @Test
    void testOperatorPlusFiveAndThree() {
        Operator operator = Operator.ADDITION;
        int result = operator.evaluate(5, 3);
        assertEquals(8, result);
    }

    @Test
    void testOperatorPlusSixAndEight() {
        Operator operator = Operator.ADDITION;
        int result = operator.evaluate(6, 8);
        assertEquals(14, result);
    }

    @Test
    void testOperatorMultiplyFiveAndThree() {
        Operator operator = Operator.MULTIPLICATION;
        int result = operator.evaluate(5, 3);
        assertEquals(15, result);
    }

    @Test
    void testOperatorMultiplySixAndEight() {
        Operator operator = Operator.MULTIPLICATION;
        int result = operator.evaluate(6, 8);
        assertEquals(48, result);
    }
}
