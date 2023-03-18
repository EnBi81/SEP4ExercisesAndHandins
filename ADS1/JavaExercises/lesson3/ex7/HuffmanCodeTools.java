package lesson3.ex7;

import java.util.Map;
import java.util.Set;

public class HuffmanCodeTools {

    public static String encodeString(Node<Set<Character>> tree, String text) {
        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            sb.append(encode(tree, c));
        }
        return sb.toString();
    }

    public static String decodeString(Node<Set<Character>> tree, String code) {
        StringBuilder sb = new StringBuilder();
        while(!code.isEmpty()) {
            char c = decode(tree, code);
            sb.append(c);
            code = code.substring(encode(tree, c).length());
        }
        return sb.toString();
    }

    public static <T> String encode(Node<Set<T>> tree, T data) {
        if(tree.isLeaf()) {
            return "";
        }

        if(tree.getLeft().getData().contains(data)) {
            return "0" + encode(tree.getLeft(),  data);
        } else {
            return "1" + encode(tree.getRight(), data);
        }
    }

    public static <T> T decode(Node<Set<T>> tree, String code) {
        if(tree.isLeaf()) {
            return tree.getData().iterator().next();
        }

        if(code.startsWith("0")) {
            return decode(tree.getLeft(), code.substring(1));
        } else {
            return decode(tree.getRight(), code.substring(1));
        }
    }
}
