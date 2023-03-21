// Hello my friend

#include "gtest/gtest.h"

extern "C" {
   #include <calc.h>
}


TEST(calc, Add) {
    EXPECT_EQ(calc_add(2, 3), 5);
    EXPECT_EQ(calc_add(0, 0), 0);
    EXPECT_EQ(calc_add(-2, 3), 1);
}


TEST(calc, Subtract) {
    EXPECT_EQ(calc_subtract(5, 3), 2);
    EXPECT_EQ(calc_subtract(0, 0), 0);
    EXPECT_EQ(calc_subtract(-2, 3), -5);
}


TEST(calc, Multiply) {
    EXPECT_EQ(calc_multiply(2, 3), 6);
    EXPECT_EQ(calc_multiply(0, 0), 0);
    EXPECT_EQ(calc_multiply(-2, 3), -6);
}


TEST(calc, Divide) {
    EXPECT_EQ(calc_divide(6, 3), 2);
    EXPECT_EQ(calc_divide(3, 0), INFINITY);
    EXPECT_EQ(calc_divide(-3, 0), -INFINITY);
    EXPECT_EQ(calc_divide(-6, 3), -2);
}

TEST(calc, Root) {
    EXPECT_EQ(calc_square_root(4), 2);
    EXPECT_EQ(calc_square_root(81), 9);
    EXPECT_EQ(calc_square_root(1), 1);
}

TEST(calc, PowerOf) {
    EXPECT_EQ(calc_power_of(4, 2), 16);
    EXPECT_EQ(calc_power_of(2, 8), 256);
    EXPECT_EQ(calc_power_of(3, 2), 9);
}

TEST(calc, Factorial) {
    EXPECT_EQ(calc_factorial(4), 24);
    EXPECT_EQ(calc_factorial(5), 120);
    EXPECT_EQ(calc_factorial(6), 720);
    EXPECT_EQ(calc_factorial(1), 1);
    EXPECT_EQ(calc_factorial(0), 1);
}

// implement tests for square root, and power of (a^b), and factorial (5! = 5*4*3*2*1=120. Also implement the code so the tests are passed.