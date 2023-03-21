
typedef struct LinkedListNode{
    int data;
    struct LinkedListNode* next;

} LinkedListNode_t;

typedef struct LinkedList {
    LinkedListNode_t* head;
} LinkedList_t;


LinkedList_t* linkedList_create();

void linkedList_append(LinkedList_t*, int value);

void linkedList_destroy(LinkedList_t*);

void linkedList_print(LinkedList_t*);