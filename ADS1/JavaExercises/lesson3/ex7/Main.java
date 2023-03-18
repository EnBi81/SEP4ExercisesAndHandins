package lesson3.ex7;

import java.util.HashMap;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        /*
        Letter	Count
        E	    21912
        T	    16587
        A	    14810
        O	    14003
        I	    13318
        N	    12666
        S	    11450
        R	    10977
        H	    10795
        D	    7874
        L	    7253
        U	    5246
        C	    4943
        M	    4761
        F	    4200
        Y	    3853
        W	    3819
        G	    3693
        P	    3316
        B	    2715
        V	    2019
        K	    1257
        X	    315
        Q	    205
        J	    188
        Z	    128
         */


        HashMap<Character, Integer> map = new HashMap<>(){{
            put('E', 21912);
            put('T', 16587);
            put('A', 14810);
            put('O', 14003);
            put('I', 13318);
            put('N', 12666);
            put('S', 11450);
            put('R', 10977);
            put('H', 10795);
            put('D', 7874);
            put('L', 7253);
            put('U', 5246);
            put('C', 4943);
            put('M', 4761);
            put('F', 4200);
            put('Y', 3853);
            put('W', 3819);
            put('G', 3693);
            put('P', 3316);
            put('B', 2715);
            put('V', 2019);
            put('K', 1257);
            put('X', 315);
            put('Q', 205);
            put('J', 188);
            put('Z', 128);
        }};

        Node<Set<Character>> huffmanTree = HuffmanTreeCreator.createTree(map);

        //printTree(huffmanTree, 0);

        String encodedText = HuffmanCodeTools.encodeString(huffmanTree, "ILOVEADS");
        System.out.println("Encoded: " + encodedText);

        String decodedText = HuffmanCodeTools.decodeString(huffmanTree, encodedText);
        System.out.println("Decoded: " + decodedText);
    }

    static <T> void printTree(Node<Set<T>> node, int level) {
        for (int i = 0; i < level; i++) {
            System.out.print(" ");
        }
        System.out.println(node.getData());
        if(node.getLeft() != null) {
            printTree(node.getLeft(), level + 1);
        }
        if(node.getRight() != null) {
            printTree(node.getRight(), level + 1);
        }
    }
}
