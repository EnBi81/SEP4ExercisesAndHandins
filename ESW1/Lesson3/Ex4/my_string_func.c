// Hello my friend
#include "stdio.h"

int read_line(char s[]){
    int c = 0;
    int i = 0;
    int done = 0;
    do
    {
        c = getchar();
        if (c == EOF || c == '\n')
        {
            done = 1;
        }
        else
        {
            s[i++] = c;
        }
    } while (!done);
    s[i] = '\0';
    return i;
}

void my_to_upper(char* str_in, char* str_out){
/* You must implement your own version of toupper using the two strings
  str_in and str_out.
  Loop over the str_in (as long as it "contains" something).
  Look at the "current" character and check if its a lowercase letter.
  If it is, convert it to the upper case version and add that to the
  str_out character array
  */

    const char charA = 'A';
    const char charZ = 'Z';
    const char chara = 'a';

    char c, upperChar;

    while(*str_in != '\0'){
        c = *str_in;
        if(c <= charZ && c >= charA){
            upperChar = c;
        }
        else if(c == ' '){
            upperChar = c;
        }
        else{
            upperChar = c - chara + charA;
        }

        *str_out = upperChar;

        str_in++;
        str_out++;
    }

    *str_out = '\0';
}

int my_length(char* text){
    /*
    Implement this function, so it returns the number of characters it is.
    */

    char* charp = text;
    int count = 0;

    while(*charp != '\0'){
        count++;
        charp++;
    }

    return count;
}