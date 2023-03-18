package lesson3.ex7;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class HuffmanTreeCreator {
    public static <T> Node<Set<T>> createTree(Map<T, Integer> map) {
        var newMap = new HashMap<Node<Set<T>>, Integer>();

        // create a new map with nodes as keys
        for (Map.Entry<T, Integer> entry : map.entrySet()) {
            var node = new Node<>(Set.of(entry.getKey()));
            newMap.put(node, entry.getValue());
        }


        return createTreeInternal(newMap);
    }

    private static <T> Node<Set<T>> createTreeInternal(HashMap<Node<Set<T>>, Integer> map) {
        int lowest = Integer.MAX_VALUE;
        Node<Set<T>> lowestKey = null;
        int secondLowest = Integer.MAX_VALUE;
        Node<Set<T>> secondLowestKey = null;

        // get the two lowest values
        for (Map.Entry<Node<Set<T>>, Integer> entry : map.entrySet()) {
            if (entry.getValue() < lowest) {
                secondLowest = lowest;
                secondLowestKey = lowestKey;

                lowest = entry.getValue();
                lowestKey = entry.getKey();
            } else if (entry.getValue() < secondLowest) {
                secondLowest = entry.getValue();
                secondLowestKey = entry.getKey();
            }
        }

        if(lowestKey == null) {
            throw new RuntimeException("Map must contain at least two elements");
        }

        if(secondLowestKey == null) {
            return lowestKey;
        }

        // remove the two lowest values
        map.remove(lowestKey);
        map.remove(secondLowestKey);

        // create a new node with the two lowest values as children
        Set<T> set = new HashSet<T>();
        set.addAll(lowestKey.getData());
        set.addAll(secondLowestKey.getData());

        var newNode = new Node<>(set);
        newNode.setLeft(lowestKey);
        newNode.setRight(secondLowestKey);

        map.put(newNode, lowest + secondLowest);

        return createTreeInternal(map);
    }
}
