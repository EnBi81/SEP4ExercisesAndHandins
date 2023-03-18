package set;

/**
 * Stack Abstract Data Type
 * @param <T> Type of the elements in the stack
 */
public interface StackADS<T> {
    /**
     * Pushes an item onto the top of this stack.
     * @param item the item to be pushed onto this stack.
     * @throws NullPointerException if the item is null.
     */
    void push(T item);

    /**
     * Removes the object at the top of this stack and returns that object as the value of this function.
     * @return The object at the top of this stack.
     * @throws IllegalStateException if this stack is empty.
     */
    T pop();

    /**
     * Tests if this stack is empty.
     * @return true if and only if this stack contains no items; false otherwise.
     */
    boolean isEmpty();
}
