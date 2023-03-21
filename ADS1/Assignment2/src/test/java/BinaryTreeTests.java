import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class BinaryTreeTests {

    BinaryTree<Integer> tree;

    @BeforeEach
    public void setup() {
        tree = new BinaryTree<>();
    }

    public void createBinaryTreeNodes() {
        BinaryTreeNode<Integer> root = new BinaryTreeNode<>();
        root.setElement(1);
        tree.setRoot(root);

        BinaryTreeNode<Integer> leftChild = new BinaryTreeNode<>();
        leftChild.setElement(2);
        root.addLeftChild(leftChild);

        BinaryTreeNode<Integer> rightChild = new BinaryTreeNode<>();
        rightChild.setElement(3);
        root.addRightChild(rightChild);

        BinaryTreeNode<Integer> leftGrandChild = new BinaryTreeNode<>();
        leftGrandChild.setElement(4);
        leftChild.addLeftChild(leftGrandChild);

        BinaryTreeNode<Integer> rightGrandChild = new BinaryTreeNode<>();
        rightGrandChild.setElement(5);
        leftChild.addRightChild(rightGrandChild);

        BinaryTreeNode<Integer> leftGreatGrandChild = new BinaryTreeNode<>();
        leftGreatGrandChild.setElement(6);
        rightChild.addLeftChild(leftGreatGrandChild);

        BinaryTreeNode<Integer> leftGreatGreatGrandChild = new BinaryTreeNode<>();
        leftGreatGreatGrandChild.setElement(7);
        rightChild.addRightChild(leftGreatGreatGrandChild);

    }

    @Test
    public void createBinaryTree() {
        tree = new BinaryTree<>();
        assertTrue(tree.isEmpty());
        assertEquals(0, tree.size());
        assertEquals(-1, tree.height());
    }

    @Test
    public void testSetRoot() {
        BinaryTreeNode<Integer> root = new BinaryTreeNode<>();
        tree.setRoot(root);
        assertEquals(root, tree.getRoot());
    }

    @Test
    public void testIsEmpty() {
        assertTrue(tree.isEmpty());

        BinaryTreeNode<Integer> root = new BinaryTreeNode<>();
        tree.setRoot(root);

        assertFalse(tree.isEmpty());
    }

    @Test
    public void testSize(){
        assertEquals(0, tree.size());

        createBinaryTreeNodes();

        assertEquals(7, tree.size());
    }

    @Test
    public void testContains(){
        createBinaryTreeNodes();

        assertTrue(tree.contains(1));
        assertTrue(tree.contains(2));
        assertTrue(tree.contains(3));
        assertTrue(tree.contains(4));
        assertTrue(tree.contains(5));
        assertTrue(tree.contains(6));
        assertTrue(tree.contains(7));

        assertFalse(tree.contains(8));
        assertFalse(tree.contains(9));
        assertFalse(tree.contains(10));
    }

    @Test
    public void testHeightWhenEmpty(){
        assertTrue(tree.isEmpty());
        assertEquals(-1, tree.height());
    }

    @Test
    public void testHeightWhenOneNode(){
        BinaryTreeNode<Integer> root = new BinaryTreeNode<>();
        root.setElement(1);
        tree.setRoot(root);
        assertEquals(0, tree.height());
    }

    @Test
    public void testHeight(){
        createBinaryTreeNodes();

        assertEquals(2, tree.height());
    }

    @Test
    public void testInOrderWhenEmpty(){
        assertTrue(tree.isEmpty());
        assertNull(tree.inOrder());
    }
    @Test
    public void testPreOrderWhenEmpty(){
        assertTrue(tree.isEmpty());
        assertNull(tree.preOrder());
    }
    @Test
    public void testPostOrderWhenEmpty(){
        assertTrue(tree.isEmpty());
        assertNull(tree.postOrder());
    }
    @Test
    public void testLevelOrderWhenEmpty(){
        assertTrue(tree.isEmpty());
        assertNull(tree.levelOrder());
    }

    @Test
    public void testInOrderTraversal(){
        createBinaryTreeNodes();
        Integer[] expected = { 4, 2, 5, 1, 6, 3, 7 };
        Integer[] actual = tree.inOrder().toArray(new Integer[]{});
        assertArrayEquals(expected, actual);
    }

    @Test
    public void testPreOrderTraversal(){
        createBinaryTreeNodes();
        Integer[] expected = { 1, 2, 4, 5, 3, 6, 7 };
        Integer[] actual = tree.preOrder().toArray(new Integer[]{});
        assertArrayEquals(expected, actual);
    }

    @Test
    public void testPostOrderTraversal(){
        createBinaryTreeNodes();
        Integer[] expected = { 4, 5, 2, 6, 7, 3, 1 };
        Integer[] actual = tree.postOrder().toArray(new Integer[]{});
        assertArrayEquals(expected, actual);
    }

    @Test
    public void testLevelOrderTraversal(){
        createBinaryTreeNodes();
        Integer[] expected = { 1, 2, 3, 4, 5, 6, 7};
        Integer[] actual = tree.levelOrder().toArray(new Integer[]{});
        assertArrayEquals(expected, actual);
    }
}
