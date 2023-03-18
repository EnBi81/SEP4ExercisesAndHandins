package set;

import java.util.LinkedList;

/**
 * Stack implementation using a LinkedList
 * @param <T>
 */
public class StackImpl<T> implements StackADS<T>{
    private final LinkedList<T> linkedList;

    public StackImpl(){
        linkedList = new LinkedList<>();
    }

    @Override
    public void push(T item) {
        if(item == null)
            throw new NullPointerException("Item is null");
        linkedList.addLast(item);
    }

    @Override
    public T pop() {
        if(isEmpty())
            throw new IllegalStateException("Stack is empty");
        return linkedList.removeLast();
    }

    @Override
    public boolean isEmpty() {
        return linkedList.isEmpty();
    }
}
