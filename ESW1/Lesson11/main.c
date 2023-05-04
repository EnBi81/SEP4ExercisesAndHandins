#include <stdio.h>
#include <stdint-gcc.h>

void print_byte(uint8_t);
uint8_t clearBits(uint8_t x, uint8_t p, uint8_t n);
void clearBitsSetup();
uint8_t setBits(uint8_t x, uint8_t p, uint8_t n, uint8_t y);
void setBitsSetup();

int main() {

    clearBitsSetup();

    printf("\n");

    setBitsSetup();

    return 0;
}

void setBitsSetup(){
    uint8_t baseNum = ~0;
    uint8_t position = 1;
    uint8_t numberOfBits = 5;
    uint8_t setTo = 0b10001010;

    printf("Original byte (x): ");
    print_byte(baseNum);
    printf("\nSet %d (n) bits from position %d (p) to ", numberOfBits, position);
    print_byte(setTo);
    printf(" (y)\n");


    uint8_t result = setBits(baseNum, position, numberOfBits, setTo);
    printf("The result is: ");
    print_byte(result);
    printf("\n\n");
}

uint8_t setBits(uint8_t x, uint8_t p, uint8_t n, uint8_t y){
    // step 1: create a mask 1100_0001 & x
    // step 2: create a mask 0001_0100 | prev x

    const uint8_t numberBitSize = 8; // size of the parameter number

    // 1
    uint8_t clearedX = clearBits(x, p, n);

    // 2
    uint8_t yMask = (y & (~0 >> (numberBitSize - n))) << p;
    // n = 5 ; p = 1 ; y = 1000_1010
    // ~0 => 1111_1111
    // 1111_1111 >> 8 - n => 0001_1111
    // 1000_1010 & 0001_1111 => 0000_1010
    // 0000_1010 << p => 0001_0100
    return clearedX | yMask;
}

void clearBitsSetup(){
    uint8_t baseNum = ~0;
    uint8_t position = 1;
    uint8_t numberOfBits = 5;

    printf("Original byte: ");
    print_byte(baseNum);
    printf("\nClear %d (n) bits from position %d (p)\n", numberOfBits, position);

    uint8_t result = clearBits(baseNum, position, numberOfBits);
    printf("The result is: ");
    print_byte(result);
    printf("\n\n");
}


uint8_t clearBits(uint8_t x, uint8_t p, uint8_t n){
    uint8_t stayingMask = ~(~(~0 << n) << p);
    // n = 3 ; p = 1
    // ~0000_0000 => 1111_1111
    // 1111_1111 << n => 1111_1000
    // 1111_1000 => 0000_0111
    // 0000_0111 => 0000_1110
    // 0000_1110 => 1111_0001

    return x & stayingMask;
}


// https://stackoverflow.com/questions/111928/is-there-a-printf-converter-to-print-in-binary-format
const char *bit_rep[16] = {
        [ 0] = "0000", [ 1] = "0001", [ 2] = "0010", [ 3] = "0011",
        [ 4] = "0100", [ 5] = "0101", [ 6] = "0110", [ 7] = "0111",
        [ 8] = "1000", [ 9] = "1001", [10] = "1010", [11] = "1011",
        [12] = "1100", [13] = "1101", [14] = "1110", [15] = "1111",
};

void print_byte(uint8_t byte)
{
    printf("%s%s", bit_rep[byte >> 4], bit_rep[byte & 0x0F]);
}