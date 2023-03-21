// Hello my friend

#include <gtest/gtest.h>

extern "C" {
    #include "LinkedList.h"
}


TEST(LinkedListTest, CreateLinkedList) {
    LinkedList_t* list2 = linkedList_create();
    EXPECT_EQ(list2->head, nullptr);
    linkedList_destroy(list2);
}

TEST(LinkedListTest, AppendToLinkedList) {
    LinkedList_t* list = linkedList_create();
    linkedList_append(list, 1);
    EXPECT_EQ(list->head->data, 1);
    EXPECT_EQ(list->head->next, nullptr);
    linkedList_append(list, 2);
    EXPECT_EQ(list->head->data, 1);
    EXPECT_EQ(list->head->next->data, 2);
    EXPECT_EQ(list->head->next->next, nullptr);
    linkedList_destroy(list);
}

TEST(LinkedListTest, PrintLinkedList) {
    testing::internal::CaptureStdout();
    LinkedList_t* list = linkedList_create();
    linkedList_append(list, 1);
    linkedList_append(list, 2);
    linkedList_print(list);
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_EQ(output, "1 2 \n");
    linkedList_destroy(list);
}
