import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BinaryTreeNodeTests {

    BinaryTreeNode<Integer> node;

    @BeforeEach
    public void setup() {
        node = new BinaryTreeNode<>();
    }

    @Test
    public void testSetElement1() {
        node.setElement(1);
        assertEquals(1, node.getElement().intValue());
    }

    @Test
    public void testSetElement5() {
        node.setElement(5);
        assertEquals(5, node.getElement().intValue());
    }

    @Test
    public void testAddLeftChild() {
        BinaryTreeNode<Integer> leftChild = new BinaryTreeNode<>();
        node.addLeftChild(leftChild);
        assertEquals(leftChild, node.getLeftChild());
    }

    @Test
    public void testAddRightChild() {
        BinaryTreeNode<Integer> rightChild = new BinaryTreeNode<>();
        node.addRightChild(rightChild);
        assertEquals(rightChild, node.getRightChild());
    }
}
