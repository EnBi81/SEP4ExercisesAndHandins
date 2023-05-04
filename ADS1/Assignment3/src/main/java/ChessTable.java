import java.util.ArrayList;
import java.util.Arrays;

public class ChessTable implements Cloneable{
    private final int nSize;
    private final TableCellType[][] tableCells;
    private int nextColumn;

    public ChessTable(int nSize){
        nextColumn = 0;
        this.nSize = nSize;
        tableCells = new TableCellType[nSize][];
        for (int i = 0; i < nSize; i++) {
            tableCells[i] = new TableCellType[nSize];
            for (int j = 0; j < nSize; j++) {
                tableCells[i][j] = TableCellType.Empty;
            }
        }
    }

    private ChessTable(TableCellType[][] copiedTable, int nextColumn){
        this.nextColumn = nextColumn;
        nSize = copiedTable.length;
        tableCells = copiedTable;
    }

    public ChessTable clone(){
        TableCellType[][] copy = new TableCellType[nSize][];
        for (int i = 0; i < nSize; i++) {
            copy[i] = tableCells[i].clone();
        }

        return new ChessTable(copy, nextColumn);
    }

    public TableCellType getTableCellType(int row, int col){
        return tableCells[row][col];
    }

    public ChessTable[] getNextSteps(){
        ArrayList<ChessTable> possibleNextSteps = new ArrayList<>();

        for (int i = 0; i < nSize; i++) {
            TableCellType currentType = getTableCellType(i, nextColumn);

            if(currentType == TableCellType.NotAllowed)
                continue;

            ChessTable newTable = clone();
            newTable.placeQueen(i, nextColumn);
            possibleNextSteps.add(newTable);
        }

        return possibleNextSteps.toArray(new ChessTable[0]);
    }

    private void placeQueen(int row, int col){

        // place the queen
        tableCells[row][col] = TableCellType.Queen;

        // set the new not allowed cells. We only need to set the cells which are to the right
        for (int i = col + 1; i < nSize; i++) { // same row to the right
            tableCells[row][i] = TableCellType.NotAllowed;
        }

        { // going diagonal up
            int iRow = row - 1;
            int iCol = col + 1;

            while (iRow >= 0 && iCol < nSize) {
                tableCells[iRow][iCol] = TableCellType.NotAllowed;

                iRow--;
                iCol++;
            }
        }

        { // going diagonal down
            int iRow = row + 1;
            int iCol = col + 1;

            while (iRow < nSize && iCol < nSize) {
                tableCells[iRow][iCol] = TableCellType.NotAllowed;

                iRow++;
                iCol++;
            }
        }

        nextColumn++;
    }

    public boolean reachedEnd(){
        return nextColumn == nSize;
    }

    public boolean hasMoreSteps(){
        // if we reached the end of the table, then no
        if(reachedEnd())
            return false;

        // check if the next column has any empty spaces
        for (int i = 0; i < nSize; i++) {
            if(getTableCellType(i, nextColumn) == TableCellType.Empty)
                return true;
        }

        return false;
    }

    @Override
    public String toString(){
        StringBuilder display = new StringBuilder();

        for (var arr : tableCells) {
            display.append(Arrays.toString(arr)).append("\n");
        }

        return display.toString();
    }
}
