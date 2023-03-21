typedef struct rectangle {
    int width;
    int height;
} rectangle_t;


void rectangle_set_dimensions(rectangle_t*, int width, int height);

int rectangle_get_area(rectangle_t*);

int rectangle_get_perimeter(rectangle_t*);

void rectangle_print_info(rectangle_t*);