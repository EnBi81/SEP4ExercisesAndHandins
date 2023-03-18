public class ArrayMinHeap {

    private int[] Heap;
    private int size;
    private int maxsize;

    // Starting at position 1 instead of 0 makes calculations easier:
    // left child = 2*n, not 2*n+1; right child = 2*n+1, not 2*(n+1)
    // parent = n / 2
    private static final int FRONT = 1;


    public ArrayMinHeap(int maxsize)
    {

        this.maxsize = maxsize;
        this.size = 0;

        Heap = new int[this.maxsize + 1]; //since we start at 1, the underlying array has to be bigger than the heap
        Heap[0] = Integer.MIN_VALUE; //dummy value
    }


    private int parent(int pos) { return pos / 2; }


    private int leftChild(int pos) { return (2 * pos); }


    private int rightChild(int pos)
    {
        return (2 * pos) + 1;
    }

    //returns true id the given position is a lef, false if it is an internal node
    private boolean isLeaf(int pos)
    {
        //TODO
        return true;
    }

    //swaos the content of nodes fpos and spos
    private void swap(int fpos, int spos)
    {

        int tmp;
        tmp = Heap[fpos];

        Heap[fpos] = Heap[spos];
        Heap[spos] = tmp;
    }


    private void minHeapify(int pos)
    {
        if(!isLeaf(pos)){
            int swapPos= pos;
            // swap with the minimum of the two children
            // to check if right child exists. Otherwise default value will be '0'
            // and that will be swapped with parent node.
            if(rightChild(pos)<=size)
                swapPos = Heap[leftChild(pos)]<Heap[rightChild(pos)]?leftChild(pos):rightChild(pos);
            else
                swapPos= Heap[leftChild(pos)];

            if(Heap[pos]>Heap[leftChild(pos)] || Heap[pos]> Heap[rightChild(pos)]){
                swap(pos,swapPos);
                minHeapify(swapPos);
            }

        }
    }


    public void insert(int element)
    {

        if (size >= maxsize) {
            return;
        }

        //TODO
    }


    public void print()
    {
        for (int i = 1; i <= size / 2; i++) {


            System.out.print(
                    " PARENT : " + Heap[i]
                            + " LEFT CHILD : " + Heap[2 * i]
                            + " RIGHT CHILD :" + Heap[2 * i + 1]);


            System.out.println();
        }
    }


    public int remove()
    {

        int popped = Heap[FRONT];
        //TODO

        return popped;
    }


    public static void main(String[] arg)
    {

        // Display message
        System.out.println("The Min Heap is ");

        // Creating object of class in main() method
        ArrayMinHeap minHeap = new ArrayMinHeap(15);

        // Inserting element to minHeap
        // using insert() method

        // Custom input entries
        minHeap.insert(5);
        minHeap.insert(3);
        minHeap.insert(17);
        minHeap.insert(10);
        minHeap.insert(84);
        minHeap.insert(19);
        minHeap.insert(6);
        minHeap.insert(22);
        minHeap.insert(9);

        // Print all elements of the heap
        minHeap.print();

        // Removing minimum value from above heap
        // and printing it
        System.out.println("The Min val is "
                + minHeap.remove());

        minHeap.print();
    }
}
