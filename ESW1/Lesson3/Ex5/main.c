#include <stdio.h>
#include "stdlib.h"

int main() {
    printf("\nHello, please enter the size of the array: ");
    int arraySize;
    scanf("%d", &arraySize);

    printf("Creating the array with size %d\n", arraySize);
    int* arr = malloc(sizeof(int) * arraySize);
    int* pArr = arr;

    int i, input;

    for(i = 0; i < arraySize; i++){
        printf("Please enter the %d element: ", i + 1);
        scanf("%d", &input);

        *pArr = input;
        pArr++;
    }

    printf("Calculating sum...\n");


    int sum = 0;
    pArr = arr;
    for (i = 0; i < arraySize; i++) {
        sum += *pArr;
        pArr++;
    }

    printf("The sum of the given numbers are: %d\n", sum);

    free(arr);
    arr = NULL;
    printf("Memory is now free, %p\n", arr);

    return 0;
}
