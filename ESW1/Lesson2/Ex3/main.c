#include <stdio.h>

int power(int x, int y);
void multiSwap(int* x, int* y, int* z);

int main() {
    int sevenInt = 7;
    int threeInt = 3;

    printf("%d / %d = %d\n", sevenInt, threeInt, sevenInt / threeInt);

    float sevenF = 7.0f;
    float threeF = 3.0f;

    printf("%f / %f = %f\n", sevenF, threeF, sevenF / threeF);

    double sevenD = 7.0;
    double threeD = 3.0;

    printf("%f / %f = %f\n\n", sevenD, threeD, sevenD / threeD);

    int fifteen = 15;
    printf("%d mod %d = %d\n", fifteen, sevenInt, fifteen % sevenInt);

    float fifteenF = 15.0;
    //printf("%f mod %f = %f", fifteenF, sevenF, fifteenF % sevenF); // shit its a compile error

    float zeroTwo = 0.2f;
    float zeroOne = 0.1f;

    printf("%f - %f - %f = %f\n", zeroTwo, zeroOne, zeroOne, zeroTwo - zeroOne - zeroOne);

    printf("%d ^^ %d = %d\n", 1, 2, power(1, 2));
    printf("%d ^^ %d = %d\n", 2, 2, power(2, 2));
    printf("%d ^^ %d = %d\n", 3, 2, power(3, 2));
    printf("%d ^^ %d = %d\n", 5, 3, power(5, 3));
    printf("%d ^^ %d = %d\n", 2, 10, power(2, 10));
    printf("%d ^^ %d = %d\n\n", 3, 3, power(3, 3));

    int x = 1, y = 10, z = 100;

    multiSwap(&x, &y, &z);

    printf("x = %d\n", x);
    printf("y = %d\n", y);
    printf("z = %d\n", z);

    return 0;
}

int power(int x, int y){
    int res = 1;
    for (int i = 0; i < y; ++i) {
        res *= x;
    }

    return res;
}

void multiSwap(int* x, int* y, int* z){
    int temp = *x;
    *x = *y;
    *y = *z;
    *z = temp;
}