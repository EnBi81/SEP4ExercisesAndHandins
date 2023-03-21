// Hello my friend
#include "stdlib.h"

int my_strlen(const char* str){
    char* strP = str;
    int length = 0;

    while(*strP != '\0'){
        length++;
        strP++;
    }

    return length + 1;
}

int my_strcmp(const char* str1, const char* str2){
    char* strp1 = str1;
    char* strp2 = str2;

    while((*strp1 != '\0') && (*strp2 != '\0')){
        if(*strp1 != *strp2)
            return 1;

        strp1++;
        strp2++;
    }

    if(*strp1 == *strp2)
        return 0;
    return 1;
}

char* my_strcpy(char* dest, const char* src){
    char* destStart = dest;

    for (int i = 0; src[i] != '\0'; ++i) {
        *dest = src[i];
        dest++;
    }

    *dest = '\0';

    return destStart;
}

char* my_strdup(const char* str){
    int length = my_strlen(str);
    char* newStr = malloc(sizeof(char) * length);

    for (int i = 0; i <= length; ++i) {
        newStr[i] = str[i];
    }

    return newStr;
}

void my_strUpper(const char* str, char* dest){
    const char charA = 'A';
    const char chara = 'a';
    const char charz = 'z';

    char c, upperChar;

    while (*str != '\0') {

        c = *str;

        if(c <= charz && c >= chara){
            upperChar = c - chara + charA;
        }
        else{
            upperChar = c;
        }

        *dest = upperChar;

        dest++;
        str++;
    }

    *dest = '\0';
}