package lesson3.ex4;

import javax.swing.*;
import java.util.Stack;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        // Create a tree with nodes (array like display) {10, 7, 25, 1, 9, 15, 27, *, 2, 8, *, 13, 21, *, *, *, *, *, 3}
        Node<Integer> root = Node
                .createNode(10).initNodes(
                        n1 -> n1.setValue(7).initNodes(
                                n2 -> n2.setValue(1).initNodes(
                                        n3 -> null,
                                        n3 -> n3.setValue(2).initNodes(
                                                n4 -> null,
                                                n4 -> n4.setValue(3)
                                        )
                                ),
                                n2 -> n2.setValue(9).initNodes(
                                        n3 -> n3.setValue(8),
                                        n3 -> null
                                )
                        ),
                        n1 -> n1.setValue(25).initNodes(
                                n2 -> n2.setValue(15).initNodes(
                                        n3 -> n3.setValue(13),
                                        n3 -> n3.setValue(21)
                                ),
                                n2 -> n2.setValue(27)
                        )
                );

        // Pre-order traversal
        // Should display: 10, 7, 1, 2, 3, 9, 8, 25, 15, 13, 21, 27
        preOrderTraversal(root);
    }

    public static <T> void preOrderTraversal(Node<T> root){
        if(root == null) return;

        Node<T> node = root;
        Stack<Node<T>> stack = new Stack<>();

        while(node != null){
            System.out.print(node.data + ", ");

            if(node.right != null)
                stack.push(node.right);

            if(node.left != null)
                node = node.left;
            else if(!stack.isEmpty())
                node = stack.pop();
            else
                node = null;
        }
    }
}

class Node<T>{
    public T data;
    public Node<T> right;
    public Node<T> left;


    public static <T> Node<T> createNode(T data){
        Node<T> node = new Node<>();
        node.data = data;
        return node;
    }

    public Node<T> setValue(T data){
        this.data = data;
        return this;
    }

    public Node<T> initNodes(NodeCreation<T> left, NodeCreation<T> right){
        this.left = left.createNode(new Node<>());
        this.right = right.createNode(new Node<>());
        return this;
    }
}

interface NodeCreation<T>{
    Node<T> createNode(Node<T> data);
}