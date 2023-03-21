// Hello my friend

#include "gtest/gtest.h"

extern "C" {
    #include <rectangle.h>
}


// bunch of tests:

TEST(RECTANGLE_TEST, rectangle_set_dimensions) {
    rectangle_t rect;

    rect.height = 10;
    rect.width = 20;

    EXPECT_EQ(10, rect.height);
    EXPECT_EQ(20, rect.width);

    rectangle_set_dimensions(&rect, 40, 30);

    EXPECT_EQ(30, rect.height);
    EXPECT_EQ(40, rect.width);
}

TEST(RECTANGLE_TEST, rectangle_get_area){
    rectangle_t rect;
    rectangle_set_dimensions(&rect, 10, 20);

    int area = rectangle_get_area(&rect);

    EXPECT_EQ(200, area);
}

TEST(RECTANGLE_TEST, rectangle_get_perimeter){
    rectangle_t rect;
    rectangle_set_dimensions(&rect, 10, 20);

    int perimeter = rectangle_get_perimeter(&rect);

    EXPECT_EQ(60, perimeter);
}

TEST(RECTANGLE_TEST, rectangle_print_info){
    // I don't know how to test print statements, so we just invoke it

    rectangle_t rect;
    rectangle_set_dimensions(&rect, 10, 20);

    // prints out: Rectangle (h:20 x w:10) has an area of 200 and a perimeter of 60.
    rectangle_print_info(&rect);
}