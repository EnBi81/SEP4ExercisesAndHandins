package lesson1.ex5;

public interface ADSListADT<T> {

    //adds elm (non-null) to the end of the list
    public void add(T elm);

    //all elements at position >= index are moved to the righ
    //adds elm at position index.
    //if index > list's length, inserts at end
    public void insert(int index, T elm);

    //removes elm from the list and returns true
    //all elements to the right are moved to the left
    //returns false if elm not in list
    public boolean remove(T elm);

    //returns the position of elm; -1 if not in list
    public int indexOf(T elm);

    public int size();

    //returns true if list contains elm, false otherwise
    public boolean contains(T elm);

    //removes and returns element at index, all elements to the right move left
    public T remove(int index);

    //sets element at position index to elm
    //returns old element
    public T set(int index, T elm);


}
