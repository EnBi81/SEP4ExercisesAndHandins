// Hello my friend

#include <stdlib.h>
#include "stdio.h"

typedef struct LinkedListNode{
    int data;
    struct LinkedListNode* next;

} LinkedListNode_t;

LinkedListNode_t* linkedListNode_createWithValue(int value){
    LinkedListNode_t* node = malloc(sizeof(LinkedListNode_t));
    node->next = NULL;
    node->data = value;

    return node;
}

typedef struct LinkedList {
    LinkedListNode_t* head;
} LinkedList_t;


LinkedList_t* linkedList_create(){
    LinkedList_t* list = malloc(sizeof(LinkedList_t));
    list->head = NULL;

    return list;
}

void linkedList_append(LinkedList_t* list, int value){
    if(list->head == NULL){
        list->head = linkedListNode_createWithValue(value);
        return;
    }

    LinkedListNode_t* nodeToAppend = linkedListNode_createWithValue(value);

    LinkedListNode_t* parentToAppend = list->head;
    while(parentToAppend->next != NULL){
        parentToAppend = parentToAppend->next;
    }

    parentToAppend->next = nodeToAppend;
}



void linkedList_destroy(LinkedList_t* list){
    LinkedListNode_t* node = list->head;
    free(list);

    while(node != NULL){
        LinkedListNode_t* nextNode = node->next;
        free(node);
        node = nextNode;
    }
}

void linkedList_print(LinkedList_t* list){
    LinkedListNode_t* node = list->head;

    while(node != NULL){
        printf("%d ", node->data);
        node = node->next;
    }

    printf("\n");
}