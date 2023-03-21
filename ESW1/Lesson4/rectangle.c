// Hello my friend

#include "stdio.h"

typedef struct rectangle {
    int width;
    int height;
} rectangle_t;

void rectangle_set_dimensions(rectangle_t* rectangle, int width, int height){
    rectangle->width = width;
    rectangle->height = height;
}

int rectangle_get_area(rectangle_t* rect){
    return rect->height * rect->width;
}

int rectangle_get_perimeter(rectangle_t* rect){
    return (rect->width + rect->height) * 2;
}

void rectangle_print_info(rectangle_t* rect){

    int area = rectangle_get_area(rect);
    int perimeter = rectangle_get_perimeter(rect);

    printf("Rectangle (h:%d x w:%d) has an area of %d and a perimeter of %d.", rect->height, rect->width,
           area, perimeter);
}