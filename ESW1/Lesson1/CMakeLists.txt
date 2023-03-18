cmake_minimum_required(VERSION 3.24)
project(esw C)

set(CMAKE_C_STANDARD 99)

add_executable(esw main.c calc.h calc.c)
