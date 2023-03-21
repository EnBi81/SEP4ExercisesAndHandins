#include "calc.h"


//change the functions so the tests passes. 
double calc_add(double a, double b){
    return a + b;
}

double calc_subtract(double a, double b){
    return a - b;
}

double calc_multiply(double a, double b){
    return a * b;
}

double calc_divide(double a, double b){
    return a / b;
}

double calc_square_root(double a){
    return sqrt(a);
}

double calc_power_of(double a, double b){
    return pow(a, b);
}

double calc_factorial(double a){
    int num = 1;

    for (int i = 2; i <= a; ++i) {
        num *= i;
    }

    return num;
}