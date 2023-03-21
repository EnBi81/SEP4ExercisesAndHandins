import java.util.*;

public class BinaryTree<T> {

    private BinaryTreeNode<T> root;

    public BinaryTree() {
        root = null;
    }

    /**
     * Returns a reference to the root or null if tree is empty
     * @return a reference to the root or null if tree is empty
     */
    public BinaryTreeNode<T> getRoot() {
        return root;
    }

    /**
     * Sets the root of the tree
     * @param root the root of the tree
     */
    public void setRoot(BinaryTreeNode<T> root) {
        this.root = root;
    }

    /**
     * Determines whether the tree is empty
     * @return true if the tree is empty, false otherwise
     */
    public boolean isEmpty() {
        return root == null;
    }

    /**
     * Returns the number of nodes in the tree
     * @return the number of nodes in the tree
     */
    public int size(){
        if(root == null)
            return 0;

        return sizeOfTree(root);
    }

    private int sizeOfTree(BinaryTreeNode<T> node) {
        int size = 1;

        if (node.getLeftChild() != null) {
            size += sizeOfTree(node.getLeftChild());
        }

        if (node.getRightChild() != null) {
            size += sizeOfTree(node.getRightChild());
        }

        return size;
    }

    /**
     * Determines if an element is present in the tree
     * @param element the element to search for
     * @return true if the element is present, false otherwise
     */
    public boolean contains(T element){
        if(root == null)
            return false;

        return containsInTree(element, root);
    }

    private boolean containsInTree(T element, BinaryTreeNode<T> node) {
        if(element.equals(node.getElement()))
            return true;

        if(node.getLeftChild() != null)
            if(containsInTree(element, node.getLeftChild()))
                return true;

        if(node.getRightChild() != null)
            return containsInTree(element, node.getRightChild());

        return false;
    }

    /**
     * Returns the height of the tree or -1 if the tree is empty
     * @return the height of the tree or -1 if the tree is empty
     */
    public int height(){
        return getTreeHeight(root);
    }

    protected int getTreeHeight(BinaryTreeNode<T> node){
        if(node == null)
            return -1;

        int leftHeight = getTreeHeight(node.getLeftChild());
        int rightHeight = getTreeHeight(node.getRightChild());

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Returns the elements of the tree in order
     * @return the elements of the tree in order
     */
    public ArrayList<T> inOrder(){

        if(isEmpty())
            return null;

        ArrayList<T> items = new ArrayList<>();

        Stack<BinaryTreeNode<T>> nodeToCheck = new Stack<>();
        BinaryTreeNode<T> node = root;

        while(!nodeToCheck.isEmpty() || node != null){
            if(node != null){
                nodeToCheck.push(node);
                node = node.getLeftChild();
            }
            else{
                node = nodeToCheck.pop();
                items.add(node.getElement());
                node = node.getRightChild();
            }
        }

        return items;
    }

    /**
     * Returns the elements of the tree in pre order
     * @return the elements of the tree in pre order
     */
    public ArrayList<T> preOrder(){

        if(isEmpty())
            return null;

        ArrayList<T> items = new ArrayList<>();

        Stack<BinaryTreeNode<T>> nodeToCheck = new Stack<>();
        nodeToCheck.push(root);

        while(!nodeToCheck.isEmpty()){
            BinaryTreeNode<T> node = nodeToCheck.pop();
            items.add(node.getElement());

            if(node.getRightChild() != null)
                nodeToCheck.push(node.getRightChild());

            if(node.getLeftChild() != null)
                nodeToCheck.push(node.getLeftChild());
        }

        return items;
    }

    /**
     * Returns the elements of the tree in post order
     * @return the elements of the tree in post order
     */
    public ArrayList<T> postOrder(){

        if(isEmpty())
            return null;

        ArrayList<T> items = new ArrayList<>();

        Stack<BinaryTreeNode<T>> nodeToCheck = new Stack<>();
        nodeToCheck.push(root);

        while(!nodeToCheck.isEmpty()){
            BinaryTreeNode<T> node = nodeToCheck.pop();
            items.add(node.getElement());

            if(node.getLeftChild() != null)
                nodeToCheck.push(node.getLeftChild());

            if(node.getRightChild() != null)
                nodeToCheck.push(node.getRightChild());
        }

        Collections.reverse(items);
        return items;
    }

    /**
     * Returns the elements of the tree in level order
     * @return the elements of the tree in level order
     */
    public ArrayList<T> levelOrder(){

        if(isEmpty())
            return null;

        ArrayList<T> items = new ArrayList<>();

        Deque<BinaryTreeNode<T>> nodeToCheck = new ArrayDeque<>();
        nodeToCheck.push(root);

        while(!nodeToCheck.isEmpty())
        {
            BinaryTreeNode<T> node = nodeToCheck.removeFirst();
            items.add(node.getElement());

            if(node.getLeftChild() != null)
                nodeToCheck.addLast(node.getLeftChild());

            if(node.getRightChild() != null)
                nodeToCheck.addLast(node.getRightChild());
        }

        return items;
    }
}
