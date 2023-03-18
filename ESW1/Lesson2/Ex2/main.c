#include <stdio.h>

int main() {
    // ask for input
    printf("Hello, please enter your name: ");
    char name[100]; // In C, a string is the address of the character buffer which is why we do not need & with the variable.
    scanf("%s", name);



    printf("Now please enter your age: ");
    int age;
    scanf("%d", &age);

    printf("Hello %s, your age is %d\n", name, age);


    // write to file
    FILE *file;
    file = fopen("text.txt", "w");

    fprintf(file, "Hello %s, your age is %d\n", name, age);

    fclose(file);

    // read from a file
    char c;
    file = fopen("text.txt", "r");

    if(file == NULL) {
        printf("The file does not exist\n");
        return 1;
    }

    printf("\nHere comes the characters read from the previously saved file:\n");
    while(fscanf(file, "%c", &c) != EOF){
        printf("%c", c);
    }

    return 0;
}
