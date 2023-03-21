import java.util.function.Consumer;
import java.util.function.Supplier;

public class BinarySearchTree<T extends Comparable<T>> extends BinaryTree<T> {

    /**
     * Add an element to the tree. Return true if successfully inserted, false if already present
     * @param element element to insert
     * @return true if successfully inserted, false if already present
     */
    public boolean insert(T element){

        BinaryTreeNode<T> node = getRoot();

        // if there are no elements, set the element to root
        if(node == null){
            BinaryTreeNode<T> newRoot = new BinaryTreeNode<>();
            newRoot.setElement(element);
            setRoot(newRoot);
            return true;
        }

        // loop through the binary tree, go deeper and deeper
        while(true){
            int compareResult = element.compareTo(node.getElement());

            // if the nodes are equal, it means we already have this element in the tree
            if(compareResult == 0)
                return false;

            // if the element which we want to insert is smaller than the current node value
            if(compareResult < 0){
                // if there are no left children, then assign the element as a left child
                if(node.getLeftChild() == null){
                    BinaryTreeNode<T> newNode = new BinaryTreeNode<>();
                    newNode.setElement(element);
                    node.addLeftChild(newNode);
                    break;
                }
                // else go deeper into the left child
                else{
                    node = node.getLeftChild();
                }
            }
            // else the element is larger than the current node value
            else {
                // if we don't have a right child, insert it
                if(node.getRightChild() == null){
                    BinaryTreeNode<T> newNode = new BinaryTreeNode<>();
                    newNode.setElement(element);
                    node.addRightChild(newNode);
                    break;
                }
                // else go deeper into the right child
                else{
                    node = node.getRightChild();
                }
            }
        }

        return true;
    }


    /**
     * Remove an element from the tree. Return true if successfully removed, false if not present
     * @param element the element to remove.
     * @return true if successfully removed, false if not present
     */
    public boolean removeElement(T element) {
        if (isEmpty())
            return false;

        Consumer<BinaryTreeNode<T>> setNodeToRemove = this::setRoot;
        BinaryTreeNode<T> node = getRoot();

        while (node != null) {
            int compareResult = element.compareTo(node.getElement());

            // if the nodes are equal, it means we found the element in the tree, so we have to remove it
            if (compareResult == 0) {
                break;
            }

            if(compareResult < 0){
                setNodeToRemove = node::addLeftChild;
                node = node.getLeftChild();
            }
            else{
                setNodeToRemove = node::addRightChild;
                node = node.getRightChild();
            }
        }

        if(node == null)
            return false;


        if(node.getLeftChild() != null){
            // get most right child of the left child, and assign it to the currently removed value
            BinaryTreeNode<T> parent = node;
            BinaryTreeNode<T> mostRight = node.getLeftChild();

            if(mostRight.getRightChild() == null){
                setNodeToRemove.accept(mostRight);
                mostRight.addRightChild(parent.getRightChild());
                return true;
            }

            while (mostRight.getRightChild() != null) {
                parent = mostRight;
                mostRight = mostRight.getRightChild();
            }

            parent.addRightChild(mostRight.getLeftChild());
            mostRight.addLeftChild(node.getLeftChild());
            mostRight.addRightChild(node.getRightChild());
            setNodeToRemove.accept(mostRight);

        }
        else if(node.getRightChild() != null){
            // get most left child of the right child, and assign it to the currently removed value
            BinaryTreeNode<T> parent = node;
            BinaryTreeNode<T> mostLeft = node.getRightChild();

            if(mostLeft.getLeftChild() == null){
                setNodeToRemove.accept(mostLeft);
                mostLeft.addLeftChild(parent.getLeftChild());
                return true;
            }

            while (mostLeft.getLeftChild() != null) {
                parent = mostLeft;
                mostLeft = mostLeft.getLeftChild();
            }

            parent.addLeftChild(mostLeft.getRightChild());
            mostLeft.addLeftChild(node.getLeftChild());
            mostLeft.addRightChild(node.getRightChild());
            setNodeToRemove.accept(mostLeft);
        }
        else {
            setNodeToRemove.accept(null);
        }

        return true;
    }

    /**
     * Returns the minimum element of the tree
     * @return the minimum element of the tree
     */
    public T findMin(){
        BinaryTreeNode<T> mostleft = getRoot();

        if(mostleft == null)
            return null;

        while(mostleft.getLeftChild() != null)
            mostleft = mostleft.getLeftChild();


        return mostleft.getElement();
    }

    /**
     * Returns the maximum element of the tree
     * @return the maximum element of the tree
     */
    public T findMax(){
        BinaryTreeNode<T> mostright = getRoot();

        if(mostright == null)
            return null;

        while(mostright.getRightChild() != null)
            mostright = mostright.getRightChild();

        return mostright.getElement();
    }

    /**
     * Determines if an element is present in the tree Return true if present else false.
     * @param element the element to search for
     * @return true if present else false.
     */
    @Override
    public boolean contains(T element){
        return containsRec(getRoot(), element);
    }

    private boolean containsRec(BinaryTreeNode<T> nodeToCheck, T element){
        if(nodeToCheck == null)
            return false;

        int comparisonResult = element.compareTo(nodeToCheck.getElement());

        if(comparisonResult == 0)
            return true;

        if(comparisonResult < 0)
            return containsRec(nodeToCheck.getLeftChild(), element);

        return containsRec(nodeToCheck.getRightChild(), element);
    }

    /**
     * Rebalance the entire tree, the outcome must be a balanced tree.
     */
    public void rebalance(){
        checkAndRebalanceIfNeeded(this::setRoot, this::getRoot);
    }

    /**
     * Recursively checks the whole node tree and balances it if needed. The node setter and getter parameter might
     * be confusing, it would be much easier with pointers in C, but we are in Java, so we have to be satisfied with
     * using methods as pointers. (even C# has a 'ref' keyword which means we pass a pointer, but naaaaah this is
     * Java ladies and gentlemen)
     * @param nodeSetter method to set a new node into the node getter's place
     * @param nodeGetter method to get the node from the given place
     * @return height of the current tree it checked
     */
    private int checkAndRebalanceIfNeeded(Consumer<BinaryTreeNode<T>> nodeSetter, Supplier<BinaryTreeNode<T>> nodeGetter){

        BinaryTreeNode<T> node = nodeGetter.get();

        if(node == null)
            return -1;

        int leftHeight = checkAndRebalanceIfNeeded(node::addLeftChild, node::getLeftChild);
        int rightHeight = checkAndRebalanceIfNeeded(node::addRightChild, node::getRightChild);

        // if the node is balanced
        if(Math.abs(leftHeight - rightHeight) < 2)
            return Math.max(leftHeight, rightHeight) + 1;

        // balance the node
        detectDirectUnbalanceCaseAndRotate(node, leftHeight - rightHeight, nodeSetter);

        // we just call this again in order to
        //      1. go through the current node again and check if there are no remaining unbalanced nodes
        //      2. recalculate the height because most probably it got changed.
        return checkAndRebalanceIfNeeded(nodeSetter, nodeGetter);
    }

    /**
     * Balances the parent node no matter what. It doesn't check if a rotation is needed, it doesn't check if
     * the children nodes are unbalanced. What this does it rotate the parent node with its children into the right
     * shape so the tree balances out. This method automatically detects which case should it handle from the slides
     * (case 1, 2, 3 and 4) and acts accordingly. Again, this can detect the rotation types based on the cases, but it
     * does not detect if a rotation should be made, it just does it.
     * @param parentNode node where there is an unbalance in one of its direct children
     * @param heightDifference height difference between the left and the right children
     * @param parentNodeSetter a method to set a node in the place of the current parent
     */
    private void detectDirectUnbalanceCaseAndRotate(BinaryTreeNode<T> parentNode, int heightDifference, Consumer<BinaryTreeNode<T>> parentNodeSetter){
        // if this is true, it means we have an unbalance on the left side of the node
        if(heightDifference > 0){
            // so if we got here we need to perform a right rotation,
            // but first, we have to identify if the current unbalance
            // is case 3 or case 4. If it's case 3, then we need an
            // additional left rotation before the right rotation
            int leftChildLeftHeight = getTreeHeight(parentNode.getLeftChild().getLeftChild());
            int leftChildRightHeight = getTreeHeight(parentNode.getLeftChild().getRightChild());

            // Case 3 need one more left rotation before right rotation
            if(leftChildLeftHeight < leftChildRightHeight){
                rotateLeft(parentNode.getLeftChild(), parentNode::addLeftChild);
            }

            // This is applicable for both case 3 and case 4
            rotateRight(parentNode, parentNodeSetter);
        }
        else{
            // so if we are here, the unbalance is on the right side,
            // (case 1 and 2 from the slides), so we need to perform
            // a left rotation, but first (similarly as before) we need to check
            // if this is the case two where we need to make an additional
            // right rotation

            int rightChildLeftHeight = getTreeHeight(parentNode.getRightChild().getLeftChild());
            int rightChildRightHeight = getTreeHeight(parentNode.getRightChild().getRightChild());

            // Case 2 need one more right rotation before left rotation
            if(rightChildLeftHeight > rightChildRightHeight){
                rotateRight(parentNode.getRightChild(), parentNode::addRightChild);
            }

            // And now the final rotation
            rotateLeft(parentNode, parentNodeSetter);
        }
    }

    /**
     * Makes a left rotation on the parent node and on it's right child
     * @param parentToRotate parent node to rotate
     * @param setParentNode method to set a node in the place of the current parent node
     */
    private void rotateLeft(BinaryTreeNode<T> parentToRotate, Consumer<BinaryTreeNode<T>> setParentNode){
        if(parentToRotate == null || parentToRotate.getRightChild() == null)
            return;

        BinaryTreeNode<T> newParent = parentToRotate.getRightChild();
        BinaryTreeNode<T> newLeft = parentToRotate;
        BinaryTreeNode<T> nodeB = newParent.getLeftChild();

        setParentNode.accept(newParent);
        newParent.addLeftChild(newLeft);
        newLeft.addRightChild(nodeB);
    }

    /**
     * Makes a right rotation on the parent node and on it's left child
     * @param parentToRotate parent node to rotate
     * @param setParentNode method to set a node in the place of the current parent node
     */
    private void rotateRight(BinaryTreeNode<T> parentToRotate, Consumer<BinaryTreeNode<T>> setParentNode){
        if(parentToRotate == null || parentToRotate.getLeftChild() == null)
            return;

        BinaryTreeNode<T> newParent = parentToRotate.getLeftChild();
        BinaryTreeNode<T> newRight = parentToRotate;
        BinaryTreeNode<T> nodeB = newParent.getRightChild();

        setParentNode.accept(newParent);
        newParent.addRightChild(newRight);
        newRight.addLeftChild(nodeB);
    }
}
