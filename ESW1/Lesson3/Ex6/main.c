#include <stdio.h>
#include "mystr.h"


int main() {
    char* hw1 = "Hello World!";
    char* hw2 = "Hello World!";
    char* hw3 = "hELLO wORLD!";
    int length = my_strlen(hw1);

    printf("Length of '%s' is %d\n", hw1, length);
    printf("Comparing '%s' with '%s': %d\n", hw1, hw2, my_strcmp(hw1, hw2));
    printf("Comparing '%s' with '%s': %d\n", hw1, hw3, my_strcmp(hw1, hw3));
    printf("Comparing '%s' with '%s': %d\n", hw1, "", my_strcmp(hw1, ""));

    char* copy1 = "Matyi a C kiraly";
    char copy2[20];

    my_strcpy(copy2, copy1);
    printf("Copied '%s' as '%s'\n", copy1, copy2);

    char* dup1 = my_strdup("Hello guy");
    char* dup2 = my_strdup("Whats up");

    printf("strdup 1: '%s'\n", dup1);
    printf("strdup 2: '%s'\n", dup2);

    return 0;
}
