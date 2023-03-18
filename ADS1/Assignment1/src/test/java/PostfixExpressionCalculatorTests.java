import org.junit.jupiter.api.Test;
import tokens.Operand;
import tokens.Operator;
import tokens.Token;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;

public class PostfixExpressionCalculatorTests {
    @Test
    void testExpressionOne() {
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(3));
        tokenList.add(Operand.from(2));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operator.ADDITION);

        int result = PostfixExpressionCalculator.evaluateExpression(tokenList);

        assertEquals(11, result);
    }

    @Test
    void testExpressionTwo() {
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(2));
        tokenList.add(Operator.MULTIPLICATION);

        int result = PostfixExpressionCalculator.evaluateExpression(tokenList);

        assertEquals(16, result);
    }

    @Test
    void testExpressionThree() {
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(2));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(4));
        tokenList.add(Operator.ADDITION);

        int result = PostfixExpressionCalculator.evaluateExpression(tokenList);

        assertEquals(20, result);
    }

    @Test
    void testExpressionFour() {
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(2));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(4));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.MULTIPLICATION);

        int result = PostfixExpressionCalculator.evaluateExpression(tokenList);

        assertEquals(60, result);
    }

    @Test
    void testExpressionFive() {
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(6));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(5));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);

        int result = PostfixExpressionCalculator.evaluateExpression(tokenList);

        assertEquals(58, result);
    }

    @Test
    void testExpressionNullValue(){
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(6));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(5));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(null);

        assertThrowsExactly(NullPointerException.class, () ->
                PostfixExpressionCalculator.evaluateExpression(tokenList));
    }

    @Test
    void testExpressionInvalidOne(){
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(6));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(5));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));

        // invalid expression because there is one remaining operand
        assertThrowsExactly(IllegalStateException.class, () ->
                PostfixExpressionCalculator.evaluateExpression(tokenList));
    }

    @Test
    void testExpressionInvalidTwo(){
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(6));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(5));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);

        // invalid expression because there are more operators which won't be able to be evaluated
        assertThrowsExactly(IllegalStateException.class, () ->
                PostfixExpressionCalculator.evaluateExpression(tokenList));
    }

    @Test
    void testExpressionInvalidThree(){
        ArrayList<Token> tokenList = new ArrayList<>();
        tokenList.add(Operand.from(5));
        tokenList.add(Operand.from(6));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(5));
        tokenList.add(Operator.MULTIPLICATION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(Operator.ADDITION);
        tokenList.add(Operand.from(3));
        tokenList.add(new Token() { });

        // invalid expression there is a token that is not an operator or operand
        assertThrowsExactly(IllegalArgumentException.class, () ->
                PostfixExpressionCalculator.evaluateExpression(tokenList));
    }
}
