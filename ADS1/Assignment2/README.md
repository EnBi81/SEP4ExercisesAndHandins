# ADS1 Assignment 2
## Binary search tree with a rebalance option
In this assignment you will implement a binary search tree with one special operation: rebalance.
Before you start coding consider the ADT and make sure you know exactly what to do. You are going to
make a generic tree, that is a tree that can store any kind of type (but for the BST it must implement
the comparable interface). The traversals return an ArrayList of the objects in the tree, you don’t need
to return an iterator. You don’t need to support more than one occurrence of each element either.


It’s recommended to build the tree in phases:
<ol>
<li>A binary tree</li>
<li>A binary search tree with add and remove</li>
<li>A binary search tree with rebalance (not to be mistaken with a self-balancing tree such as an
   AVL or red-black tree)</li>
</ol>

Test driven development is well suited for the assignment since it can be broken into smaller bits that
can be test on their own. Besides, it is a requirement that all parts of the code are well tested. When you
encounter errors, it can be useful to see a graphical representation of the tree. To that end I have
uploaded the source code for a simple ascii code printout of a tree, but you are welcome to make a
nicer graphical presentation (it is not a requirement).

Remember that in phase one there are no add or delete methods. This is because a general binary tree
does not have a specific ordering. In order to create a tree, you must manually do it by creating and
combining nodes.

You are welcome to work in groups of three to four students but you must hand in individually and
indicate in the code who you worked with.

The assignment must be handed in no later than March 21 at 23.55.

Feedback:
<ul>
<li>Feedback will be peer assessment. In practice, this means that you will give feedback on two of
   your fellow students’ work and receive feedback from two of your fellow students.</li>
<li>Remember to be constructive.</li>
<li>Feedback must be given no later than March 28 at 23.55.</li>
</ul>

<br>
<br>
<br>

#### Class BinaryTreeNode ADT:
<table>
<tr>
<th>Operation</th>
<th>Description</th>
</tr>
<tr>
<td>void setElement(E element)</td>
<td>Store the element in the Node</td>
</tr>
<tr>
<td>E element getElement()</td>
<td>Returns the element from the Node</td>
</tr>
<tr>
<td>void addLeftChild(BinaryTreeNode)</td>
<td>Add a left child to the Node</td>
</tr>
<tr>
<td>void addRightChild(BinaryTreeNode)</td>
<td>Add a right child to the Node</td>
</tr>
<tr>
<td>BinaryTreeNode getLeftChild()</td>
<td>Returns a reference to the left child or null if there is no left child</td>
</tr>
<tr>
<td>BinaryTreeNode getRightChild()</td>
<td>Returns a reference to the right child
or null if there is no right child</td>
</tr>
</table>

<br>
<br>

#### Class BinaryTree ADT:
<table>
<tr>
<th>Operation</th>
<th>Description</th>
</tr>
<tr>
<td>BinaryTreeNode getRoot()</td>
<td>Returns a reference to the root or null if tree is empty</td>
</tr>
<tr>
<td>void setRoot(BinaryTreeNode)</td>
<td>Set the root of the tree</td>
</tr>
<tr>
<td>boolean isEmpty()</td>
<td>Determines whether the tree is empty</td>
</tr>
<tr>
<td>int size()</td>
<td>Returns the number of elements in the tree</td>
</tr>
<tr>
<td>boolean contains(E element)</td>
<td>Determines if an element is present in the tree</td>
</tr>
<tr>
<td>ArrayList < E > inOrder()</td>
<td>Returns a inOrder representation of the tree
or null if the tree is empty</td>
</tr>
<tr>
<td>ArrayList < E > preorder()</td>
<td>Returns a preOrder representation of the tree
or null if the tree is empty</td>
</tr>
<tr>
<td>ArrayList < E > postOrder()</td>
<td>Returns a postOrder representation of the tree
or null if the tree is empty</td>
</tr>
<tr>
<td>ArrayList < E > levelOrder()</td>
<td>Returns a level Order representation of the tree
or null if the tree is empty</td>
</tr>
<tr>
<td>int height()</td>
<td>Returns the height of the tree
or -1 if the tree is empty</td>
</tr>
</table>

<br>
<br>

#### Class BinarySearchTree ADT (extends Binary Tree):
<table>
<tr>
<th>Operation</th>
<th>Description</th>
</tr>
<tr>
<td>boolean insert(E element)</td>
<td>Add an element to the tree.
Return true if successfully inserted, false if already
present</td>
</tr>
<tr>
<td>boolean removeElement(E element)</td>
<td>Remove an element from the tree
Return true if successfully removed, false if not present</td>
</tr>
<tr>
<td>E element findMin()</td>
<td>Returns the minimum element of the tree</td>
</tr>
<tr>
<td>E element findMax()</td>
<td>Returns the maximum element of the tree</td>
</tr>
<tr>
<td>boolean contains(Element)</td>
<td>Determines if an element is present in the tree
Return true if present else false.</td>
</tr>
<tr>
<td>void rebalance()</td>
<td>Rebalance the entire tree, the outcome must
be a balanced tree.</td>
</tr>
</table>