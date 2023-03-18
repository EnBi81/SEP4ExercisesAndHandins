import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import set.StackADS;
import set.StackImpl;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the StackADS interface
 */
public class StackADSTests {

    private StackADS<Integer> stack;


    @BeforeEach
    void init() {
        stack = new StackImpl<>();
    }

    @Test
    void createStackCheckIfEmpty() {
        assertTrue(stack.isEmpty());
    }

    @Test
    void pushOneItemCheckIfEmpty() {
        stack.push(1);

        assertFalse(stack.isEmpty());
    }

    @Test
    void pushOneItemPopCheckIfEmpty() {
        stack.push(1);
        stack.pop();

        assertTrue(stack.isEmpty());
    }

    @Test
    void pushOneItemPopCheckIfCorrect() {
        stack.push(1);

        int result = stack.pop();

        assertEquals(1, result);
    }

    @Test
    void pushTwoItemsPopCheckIfCorrect() {
        stack.push(1);
        stack.push(2);

        int result = stack.pop();
        assertEquals(2, result);

        result = stack.pop();
        assertEquals(1, result);
    }


    @Test
    void pushTwoItemsPopTwiceCheckIfEmpty() {
        stack.push(1);
        stack.push(2);

        stack.pop();
        stack.pop();

        assertTrue(stack.isEmpty());

        assertThrowsExactly(IllegalStateException.class,
                            () -> stack.pop());
    }


    @Test
    void pushNullValueCheckException() {
        assertThrowsExactly(NullPointerException.class,
                            () -> stack.push(null));
    }
}