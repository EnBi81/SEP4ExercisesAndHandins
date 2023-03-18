package lesson1.ex5;

public class ADSLinkedList<T> implements ADSListADT<T> {

    private Node<T> first;
    private int size;

    public ADSLinkedList(){
        first = null;
        size = 0;
    }

    private boolean isSubObjectEqual(Node<T> node, T other){
        if(node.getElm() == other)
            return true;

        return other != null && other.equals(node.getElm());
    }

    @Override
    public void add(T elm) {
        if(elm == null){
            return;
        }
        Node<T> newNode = new Node<>(elm, null);
        // if list is empty then set the element as head
        if(size == 0){
            first = newNode;
        }
        // else loop to the end of the list and add the element there
        else {
            Node<T> cur = first;
            while(cur.getNext() != null){
                cur = cur.getNext();
            }
            cur.setNext(newNode);
        }
        size++;
    }

    @Override
    public void insert(int index, T elm) {
        // if index smaller than 0 don't do anything
        if(index < 0){ return;}
        // if index bigger than size, append the element at the end
        if(index > size){
            add(elm);
            return;
        }
        Node<T> newNode = new Node<>(elm, null);
        // if list is empty then set the element as head
        if(size == 0) {
            first = newNode;
        }
        // else set the element in the right position
        else {
            // this was added by the lovely GitHub copilot
            if(index == 0){
                newNode.setNext(first);
                first = newNode;
                size++;
                return;
            }

            Node<T> cur = first;
            int i = 0;
            while(i < index - 1){
                cur = cur.getNext();
                i++;
            }
            newNode.setNext(cur.getNext());
            cur.setNext(newNode);
        }
        size++;
    }

    @Override
    public boolean remove(T elm) {
        if(first == null)
            return false;

        Node<T> prev = null;
        Node<T> cur = first;
        while(cur != null){
            if(isSubObjectEqual(cur, elm)){
                if(prev != null)
                    prev.setNext(cur.getNext());
                else first = cur.getNext();

                size--;
                return true;
            }

            prev = cur;
            cur = cur.getNext();
        }

        return false;
    }

    @Override
    public int indexOf(T elm) {
        if(first == null)
            return -1;

        int index = 0;
        Node<T> cur = first;

        while (cur != null) {
            if(isSubObjectEqual(cur, elm))
                return index;

            index++;
            cur = cur.getNext();
        }

        return -1;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean contains(T elm) {
        if(first == null)
            return false;

        Node<T> cur = first;
        while(cur != null){
            if(isSubObjectEqual(cur, elm))
                return true;

            cur = cur.getNext();
        }

        return false;
    }

    @Override
    public T remove(int index) {
        if (index < 0)
            return null;

        if(first == null)
            return null;

        Node<T> prev = null;
        Node<T> cur = first;

        int i = 0;
        while(i++ < index){
            prev = cur;
            cur = cur.getNext();

            if(cur == null){
                return null;
            }
        }

        if(prev == null) {
            first = cur.getNext();
            size--;

            return first == null ? null : cur.getElm();
        }

        prev.setNext(cur.getNext());
        size--;
        return cur.getElm();
    }

    @Override
    public T set(int index, T elm) {
        if(first == null)
            return null;

        Node<T> cur = first;
        for (int i = 0; i <= index - 1; i++) {
            cur = cur.getNext();

            if(cur == null)
                return null;
        }

        T oldElm = cur.getElm();
        cur.setElm(elm);
        return oldElm;
    }
}
