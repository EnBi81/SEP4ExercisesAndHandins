#include <stdio.h>

int main() {

    // 1.2	Create a program where the user writes the length and
    //      breadth of a rectangle and the program prints area of the rectangle.
    printf("Hello, my friend! This is the coolest rectangle area calculator. To proceed, please enter"
           "the length and the breadth of the rectangle.\nLength: ");
    float length;
    scanf("%f", &length);

    float breadth;
    printf("Breadth: ");
    scanf("%f", &breadth);

    float area = length * breadth;
    printf("The area of your rectangle is %f\n", area);

    char text[20];
    scanf("%[\n]s", text);

    return 0;
}
