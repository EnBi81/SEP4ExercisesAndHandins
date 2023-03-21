public class BinaryTreeNode<T> {

    private T element;
    private BinaryTreeNode<T> leftChild;
    private BinaryTreeNode<T> rightChild;


    /**
     * Store the element in the Node
     * @param element the element to store
     */
    public void setElement(T element){
        this.element = element;
    }

    /**
     * Returns the element from the Node
     * @return the element from the Node
     */
    public T getElement(){
        return element;
    }

    /**
     * Add a left child to the Node
     * @param leftChild the left child to add
     */
    public void addLeftChild(BinaryTreeNode<T> leftChild){
        this.leftChild = leftChild;
    }

    /**
     * Returns a reference to the left child or null if there is no left child
     * @return a reference to the left child or null if there is no left child
     */
    public BinaryTreeNode<T> getLeftChild(){
        return leftChild;
    }

    /**
     * Add a right child to the Node
     * @param rightChild the right child to add
     */
    public void addRightChild(BinaryTreeNode<T> rightChild){
        this.rightChild = rightChild;
    }

    /**
     * Returns a reference to the right child or null if there is no right child
     * @return a reference to the right child or null if there is no right child
     */
    public BinaryTreeNode<T> getRightChild(){
        return rightChild;
    }
}
