cmake_minimum_required(VERSION 3.24)
project(esw2 C)

set(CMAKE_C_STANDARD 11)

add_executable(esw2 main.c addition.c subtraction.c multiplication.c)
