#include <stdio.h>
#include "my_string_func.h"

#define MAX_LENGTH 1000

int main()
{
    char line[MAX_LENGTH];
    char upper[MAX_LENGTH];
    int line_length;
    /* Use a while loop to read input lines as long as there are any.
    For each input line, print the length of the line as well as
    the upper case version of the line
    NOTE You are NOT allowed to use the standard toupper(...)
    function in string.h
    */
    while (read_line(line))
    {
        line_length = my_length(line);
        my_to_upper(line, upper);

        printf("Length: %d\t%s\n", line_length, upper);
    }
    return 0;
}
