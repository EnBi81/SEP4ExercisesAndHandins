import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BinarySearchTreeTests {

    BinarySearchTree<Integer> searchTree;

    @BeforeEach
    public void setup(){
        searchTree = new BinarySearchTree<>();
    }

    @Test
    public void createEmpty(){
        assertTrue(searchTree.isEmpty());
        assertEquals(0, searchTree.size());
        assertEquals(-1, searchTree.height());
    }

    @Test
    public void insertTest(){
        assertTrue(searchTree.insert(5));
        assertTrue(searchTree.insert(3));
        assertTrue(searchTree.insert(8));
        assertTrue(searchTree.insert(1));
        assertTrue(searchTree.insert(4));
        assertTrue(searchTree.insert(2));
        assertTrue(searchTree.insert(9));
        assertTrue(searchTree.insert(7));


        Integer[] expectedInLevel = {
                        5,
                3,              8,
            1,      4,      7,      9,
              2                       };
        Integer[] actual = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel, actual);
    }

    @Test
    public void insertWithDuplicateTest(){
        assertTrue(searchTree.insert(4));
        assertTrue(searchTree.insert(3));
        assertTrue(searchTree.insert(2));
        assertTrue(searchTree.insert(1));
        assertFalse(searchTree.insert(3)); // duplicate
        assertFalse(searchTree.insert(2)); // duplicate
        assertTrue(searchTree.insert(9));
        assertFalse(searchTree.insert(4)); // duplicate
        assertTrue(searchTree.insert(7));

        assertTrue(searchTree.contains(4));
        assertTrue(searchTree.contains(3));
        assertTrue(searchTree.contains(2));
        assertTrue(searchTree.contains(9));

        assertFalse(searchTree.contains(11));
        assertFalse(searchTree.contains(8));
        assertFalse(searchTree.contains(0));


        Integer[] expectedInLevel = {
                        4,
                3,              9,
            2,              7,
         1                              };
        Integer[] actual = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel, actual);
    }

    @Test
    public void removeItemAndInsertAgain(){
        searchTree.insert(3);
        searchTree.insert(5);

        assertTrue(searchTree.contains(5));

        searchTree.removeElement(5);

        assertFalse(searchTree.contains(5));

        searchTree.insert(5);

        assertTrue(searchTree.contains(5));
    }

    @Test
    public void removeRootTest(){
        searchTree.insert(4);

        assertEquals(1, searchTree.size());
        assertEquals(4, searchTree.getRoot().getElement());

        searchTree.removeElement(4);

        assertEquals(0, searchTree.size());
        assertNull(searchTree.getRoot());
    }

    @Test
    public void removeLeafTest(){
        searchTree.insert(4);
        searchTree.insert(2);
        searchTree.insert(3);
        searchTree.insert(1);

        Integer[] expectedInLevel1 = {
                        4,
                    2,
                1,      3            };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);

        searchTree.removeElement(1);

        Integer[] expectedInLevel2 = {
                        4,
                    2,
                        3            };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);

        searchTree.removeElement(3);

        Integer[] expectedInLevel3 = {
                        4,
                    2                };
        Integer[] actual3 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel3, actual3);

        searchTree.removeElement(2);

        Integer[] expectedInLevel4 = { 4 };
        Integer[] actual4 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel4, actual4);
    }

    @Test
    public void removeFromMiddle(){
        searchTree.insert(5);

        searchTree.insert(3);
        searchTree.insert(1);
        searchTree.insert(4);

        searchTree.insert(7);
        searchTree.insert(6);
        searchTree.insert(8);

        Integer[] expectedInLevel1 = {
                            5,
                    3,              7,
                1,      4,      6,      8 };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);



        assertTrue(searchTree.removeElement(3));



        Integer[] expectedInLevel2 = {
                        5,
                1,             7,
                    4,      6,    8 };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }

    @Test
    public void removeNonExistent(){
        searchTree.insert(1);
        searchTree.insert(2);
        searchTree.insert(4);
        searchTree.insert(5);
        searchTree.insert(7);

        assertTrue(searchTree.removeElement(1));
        assertTrue(searchTree.removeElement(2));
        assertTrue(searchTree.removeElement(4));
        assertTrue(searchTree.removeElement(5));
        assertFalse(searchTree.removeElement(3));
        assertFalse(searchTree.removeElement(6));
        assertFalse(searchTree.removeElement(8));
    }

    @Test
    public void removeAdvancedTest(){
        searchTree.insert(10);
        searchTree.insert(5);
        searchTree.insert(1);
        searchTree.insert(8);
        searchTree.insert(9);
        searchTree.insert(6);
        searchTree.insert(7);


        assertEquals(7, searchTree.size());
        Integer[] expectedInLevel1 = {
                                        10,
                            5,
                    1,              8,
                                6,      9,
                                  7                 };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);

        assertTrue(searchTree.removeElement(5));


        assertEquals(6, searchTree.size());
        Integer[] expectedInLevel2 = {
                                10,
                     1,
                          8,
                       6,    9,
                         7                       };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);


        assertTrue(searchTree.removeElement(1));



        assertEquals(5, searchTree.size());
        Integer[] expectedInLevel3 = {
                                10,
                        6,
                            8,
                          7,  9                 };
        Integer[] actual3 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel3, actual3);



        assertTrue(searchTree.removeElement(8));



        assertEquals(4, searchTree.size());
        Integer[] expectedInLevel4 = {
                                10,
                        6,
                            7,
                              9             };
        Integer[] actual4 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel4, actual4);
    }

    @Test
    public void testMinWhenEmpty(){
        assertTrue(searchTree.isEmpty());
        assertNull(searchTree.findMin());
    }

    @Test
    public void testMin(){
        searchTree.insert(10);
        searchTree.insert(5);
        searchTree.insert(1);
        searchTree.insert(8);
        searchTree.insert(9);
        searchTree.insert(6);
        searchTree.insert(7);

        assertEquals(1, searchTree.findMin());
        searchTree.removeElement(1);

        assertEquals(5, searchTree.findMin());
        searchTree.removeElement(5);

        assertEquals(6, searchTree.findMin());
    }

    @Test
    public void testMaxWhenEmpty(){
        assertTrue(searchTree.isEmpty());
        assertNull(searchTree.findMax());
    }

    @Test
    public void testMax(){
        searchTree.insert(10);
        searchTree.insert(5);
        searchTree.insert(1);
        searchTree.insert(8);
        searchTree.insert(9);
        searchTree.insert(6);
        searchTree.insert(7);

        assertEquals(10, searchTree.findMax());
        searchTree.removeElement(10);

        assertEquals(9, searchTree.findMax());

        searchTree.insert(12);
        assertEquals(12, searchTree.findMax());
    }


    @Test
    public void containsTest(){
        searchTree.insert(10);
        searchTree.insert(5);
        searchTree.insert(1);
        searchTree.insert(8);
        searchTree.insert(9);
        searchTree.insert(6);
        searchTree.insert(7);



        assertTrue(searchTree.contains(1));
        assertTrue(searchTree.contains(5));
        assertTrue(searchTree.contains(6));
        assertTrue(searchTree.contains(7));
        assertTrue(searchTree.contains(8));
        assertTrue(searchTree.contains(9));
        assertTrue(searchTree.contains(10));

        assertFalse(searchTree.contains(0));
        assertFalse(searchTree.contains(2));
        assertFalse(searchTree.contains(3));
        assertFalse(searchTree.contains(4));
        assertFalse(searchTree.contains(11));
        assertFalse(searchTree.contains(100));
    }

    /*
    ----------------------------------------------------------------------
                                Rebalancing
    ----------------------------------------------------------------------
     */

    @Test
    public void rebalancingCase1Test(){
        searchTree.insert(2);
        searchTree.insert(1);
        searchTree.insert(4);
        searchTree.insert(3);
        searchTree.insert(6);
        searchTree.insert(5);
        searchTree.insert(7);

        Integer[] expectedInLevel1 = {
                            2,
                    1,              4,
                                3,      6,
                                      5,  7     };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);


        // act
        searchTree.rebalance();


        Integer[] expectedInLevel2 = {
                            4,
                    2,              6,
                1,      3,      5,      7   };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }

    @Test
    public void rebalancingCase2Test(){
        searchTree.insert(2);
        searchTree.insert(1);
        searchTree.insert(6);
        searchTree.insert(7);
        searchTree.insert(4);
        searchTree.insert(3);
        searchTree.insert(5);

        Integer[] expectedInLevel1 = {
                            2,
                    1,              6,
                                4,      7,
                              3,  5
        };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);


        // act
        searchTree.rebalance();



        Integer[] expectedInLevel2 = {
                            4,
                    2,              6,
                1,      3,      5,      7
        };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }

    @Test
    public void rebalancingCase3Test(){
        searchTree.insert(6);
        searchTree.insert(7);
        searchTree.insert(2);
        searchTree.insert(1);
        searchTree.insert(4);
        searchTree.insert(3);
        searchTree.insert(5);

        Integer[] expectedInLevel1 = {
                                6,
                        2,              7,
                    1,      4,
                          3,  5             };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);


        // act
        searchTree.rebalance();



        Integer[] expectedInLevel2 = {
                            4,
                    2,              6,
                1,      3,      5,      7
        };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }

    @Test
    public void rebalancingCase4Test(){
        searchTree.insert(6);
        searchTree.insert(7);
        searchTree.insert(4);
        searchTree.insert(5);
        searchTree.insert(2);
        searchTree.insert(1);
        searchTree.insert(3);

        Integer[] expectedInLevel1 = {
                                6,
                        4,              7,
                    2,      5,
                  1,  3
        };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);


        // act
        searchTree.rebalance();


        Integer[] expectedInLevel2 = {
                            4,
                    2,              6,
                1,      3,      5,      7
        };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }


    @Test
    public void testMultipleRebalance(){
        searchTree.insert(50);
        searchTree.insert(40);
        searchTree.insert(33);
        searchTree.insert(35);
        searchTree.insert(30);
        searchTree.insert(10);
        searchTree.insert(5);
        searchTree.insert(15);
        searchTree.insert(2);
        searchTree.insert(1);
        searchTree.insert(34);
        searchTree.insert(51);
        searchTree.insert(52);
        searchTree.insert(53);
        searchTree.insert(54);


        assertEquals(15, searchTree.size());
        Integer[] expectedInLevel1 = {
                                                            50,
                                            40,                                51,
                                33,                                                         52,
                      30,                 35,                                                       53,
               10,                   34,                                                                 54,
           5,       15,
         2,
        1,

        };
        Integer[] actual1 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel1, actual1);


        searchTree.rebalance();


        assertEquals(15, searchTree.size());
        Integer[] expectedInLevel2 = {
                                                                50,
                                   33,                                                          53,
                        10,                     35,                               51,                           54,
                    2,       30,            34,      40,                                52,
                  1,  5,  15,
        };
        Integer[] actual2 = searchTree.levelOrder().toArray(new Integer[0]);
        assertArrayEquals(expectedInLevel2, actual2);
    }
}
