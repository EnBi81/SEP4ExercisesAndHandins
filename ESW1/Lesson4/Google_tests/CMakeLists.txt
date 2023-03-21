# 'Google_test' is the subproject name
project(Google_test)

# 'lib' is the folder with Google Test sources
add_subdirectory(lib/googletest)
#include_directories(${lib/googletest-main/googletest}/include ${lib/googletest-main/googletest})
#include_directories(lib/googletest-main/googletest/include lib/googletest-main/googletest)
include_directories(Google_tests/lib/googletest/googletest/include/ Google_tests/lib/googletest/googletest/)


set(PROJECT_HEADERS
        ../calc.h
        ../mystr.h
        ../rectangle.h ../LinkedList.h)
set(PROJECT_SOURCES
        ../calc.c
        ../mystr.c
        ../rectangle.c

        test_calc.cpp
        test_rectangle.cpp
        test_mystr.cpp test_linked_list.cpp ../LinkedList.c)

add_executable(Google_Tests_run ${PROJECT_SOURCES} ${PROJECT_HEADERS} )
# 'Google_Tests_run' is the target name
# 'test1.cpp tests2.cpp' are source files with tests
#add_executable(Google_Tests_run test_calc.cpp) # list all test files like: test1.cpp tests2.cpp
target_link_libraries(Google_Tests_run gtest gtest_main)

include_directories(../../Lesson4/)