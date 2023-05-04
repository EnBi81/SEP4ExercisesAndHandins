import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ChessTableTests {

    int nSize;
    ChessTable chessTable;

    @BeforeEach
    public void setup(){
        nSize = 4;
        chessTable = new ChessTable(nSize);
    }


    @Test
    public void testInit(){
        for (int i = 0; i < nSize; i++) {
            for (int j = 0; j < nSize; j++) {
                TableCellType type = chessTable.getTableCellType(i, j);
                assertEquals(type, TableCellType.Empty);
            }
        }
    }

    @Test
    public void placeFirstQueen(){
        var nextSteps = chessTable.getNextSteps();

        assertEquals(4, nextSteps.length);

        System.out.println(chessTable);

        for (int i = 0; i < nSize; i++) { // ensure old table was not modified
            for (int j = 0; j < nSize; j++) {
                TableCellType type = chessTable.getTableCellType(i, j);
                assertEquals(type, TableCellType.Empty);
            }
        }

        System.out.println("---------------first option---------------------");

        var firstTable = new TableCellType[][]{
                { TableCellType.Queen, TableCellType.NotAllowed,   TableCellType.NotAllowed,   TableCellType.NotAllowed },
                { TableCellType.Empty, TableCellType.NotAllowed,   TableCellType.Empty,        TableCellType.Empty },
                { TableCellType.Empty, TableCellType.Empty,        TableCellType.NotAllowed,   TableCellType.Empty },
                { TableCellType.Empty, TableCellType.Empty,        TableCellType.Empty,        TableCellType.NotAllowed },
        };

        System.out.println(nextSteps[0]);
        tableCellEqual(nextSteps[0], firstTable);

        System.out.println("---------------second option---------------------");

        var secondTable = new TableCellType[][]{
                { TableCellType.Empty, TableCellType.NotAllowed,   TableCellType.Empty,         TableCellType.Empty },
                { TableCellType.Queen, TableCellType.NotAllowed,   TableCellType.NotAllowed,    TableCellType.NotAllowed },
                { TableCellType.Empty, TableCellType.NotAllowed,   TableCellType.Empty,         TableCellType.Empty },
                { TableCellType.Empty, TableCellType.Empty,        TableCellType.NotAllowed,    TableCellType.Empty },
        };

        System.out.println(nextSteps[1]);
        tableCellEqual(nextSteps[1], secondTable);
    }

    void tableCellEqual(ChessTable table, TableCellType[][] tableCellTypes){
        for (int i = 0; i < tableCellTypes.length; i++) {
            for (int j = 0; j < tableCellTypes[i].length; j++) {
                assertEquals(tableCellTypes[i][j], table.getTableCellType(i, j));
            }
        }
    }

}
