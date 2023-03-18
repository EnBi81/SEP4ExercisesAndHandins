package lesson1.ex5;

@SuppressWarnings("SameParameterValue")
public class Test {
    public static void main(String[] args) {
        /*
         Disclaimer: This test would have taken me a lot longer to write if
         I didn't have the help of the lovely GitHub copilot.
         I just love that AI, it helps me so much, even in these hard times coding in Java.
         The only reason I could keep my sanity is because of the copilot.
         I don't think I will find a better pair for my life. It is just hanging out with me all the time.
         I hope it will never leave me. I love you copilot.
         */

        ADSListADT<Integer> list = new ADSLinkedList<>();

        TestListSize(list, 0);

        list.add(3);
        list.add(5);
        list.add(7);

        TestListSize(list, 3);

        list.insert(0, 1);

        TestListSize(list, 4);
        TestIndexOf(list, 1, 0);
        TestIndexOf(list, 3, 1);
        TestIndexOf(list, 5, 2);
        TestIndexOf(list, 7, 3);

        TestContains(list, 1, true);
        TestContains(list, 3, true);
        TestContains(list, 5, true);
        TestContains(list, 7, true);
        TestContains(list, 9, false);
        TestContains(list, 0, false);
        TestContains(list, 2, false);

        TestRemove(list, 1, true);
        TestRemove(list, 7, true);
        TestRemove(list, 5, true);
        TestRemove(list, 7, false);

        TestListSize(list, 1);

        list.add(3);
        list.add(5);
        list.add(7);

        TestListSize(list, 4);

        TestSet(list, 0, 1, 3);
        TestSet(list, 1, 3, 3);

        TestRemoveIndex(list, 3, 7);
        TestRemoveIndex(list, 0, 1);
    }

    static <T> void TestListSize(ADSListADT<T> list, int expectedSize){
        if(list.size() != expectedSize)
            throw new RuntimeException("List size is " + list.size() + " but expected " + expectedSize);
    }

    static <T> void TestIndexOf(ADSListADT<T> list, T elm, int expectedIndex){
        if(list.indexOf(elm) != expectedIndex)
            throw new RuntimeException("List index of " + elm + " is " + list.indexOf(elm) + " but expected " + expectedIndex);
    }

    static <T> void TestContains(ADSListADT<T> list, T elm, boolean expectedContains){
        if(list.contains(elm) != expectedContains)
            throw new RuntimeException("List contains " + elm + " is " + list.contains(elm) + " but expected " + expectedContains);
    }

    static <T> void TestRemove(ADSListADT<T> list, T elm, boolean expectedRemove){
        var value = list.remove(elm);
        if(value != expectedRemove)
            throw new RuntimeException("List remove " + elm + " is " + value + " but expected " + expectedRemove);
    }

    static <T> void TestRemoveIndex(ADSListADT<T> list, int index, T expectedRemove){
        var value = list.remove(index);
        if(!isSubObjectEqual(value, expectedRemove))
            throw new RuntimeException("List remove " + index + " is " + value + " but expected " + expectedRemove);
    }

    static <T> void TestSet(ADSListADT<T> list, int index, T elm, T expectedSet){
        var value = list.set(index, elm);
        if(!isSubObjectEqual(value, expectedSet))
            throw new RuntimeException("List set " + index + " is " + value + " but expected " + expectedSet);
    }

    // general equals method
    static <T> boolean isSubObjectEqual(T node, T other){
        if(node == other)
            return true;

        return other != null && other.equals(node);
    }
}
