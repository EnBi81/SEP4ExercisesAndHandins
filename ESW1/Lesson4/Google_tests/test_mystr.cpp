// Hello my friend

#include "gtest/gtest.h"

extern "C" {
    #include <mystr.h>
}

TEST(StringManipulation, my_strlen ) {
    EXPECT_EQ(my_strlen("Hello, world!"), 14);
    EXPECT_EQ(my_strlen(""), 1);
}

TEST(StringManipulation, my_strcmp) {
    EXPECT_TRUE(my_strcmp("Hello, world!", "Hello, world!")==0);
    EXPECT_TRUE(my_strcmp("Hi", "Hi!")!=0);
    EXPECT_TRUE(my_strcmp("Hey", "Hi!")!=0);
}

TEST(StringManipulation, my_strcpy) {
    char dest[20];
    my_strcpy(dest, "Hello, world!");
    EXPECT_STREQ(dest, "Hello, world!");
    my_strcpy(dest, "");
    EXPECT_STREQ(dest, "");
}

TEST(StringManipulation, my_strdup) {
    char* str1 = my_strdup("Hello, world!");
    EXPECT_STREQ(str1, "Hello, world!");
    char* str2 = my_strdup("");
    EXPECT_STREQ(str2, "");
}

TEST(StringManipulation, my_strUpper) {
    char dest[20];
    my_strUpper( "Hello, world!",dest);
    EXPECT_STREQ(dest, "HELLO, WORLD!");
}
