cmake_minimum_required(VERSION 3.24)
#project(Lesson4 C)
project(Lesson4 CXX C)

set(CMAKE_C_STANDARD 11)

#add_executable(Lesson4 main.c calc.c)

add_subdirectory(Google_tests)

include_directories(Google_tests/lib/googletest/googletest/include/ Google_tests/lib/googletest/googletest/)

set(PROJECT_HEADERS
        calc.h
        rectangle.h LinkedList.h)
set(PROJECT_SOURCES
        main.c
        calc.c
        rectangle.c LinkedList.c)

add_executable(Lesson4 ${PROJECT_SOURCES} ${PROJECT_HEADERS})