import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        int nSize = 4;

        Deque<ChessTable> potentionalNexts = new ArrayDeque<>();
        potentionalNexts.push(new ChessTable(nSize));

        ArrayList<ChessTable> winners = new ArrayList<>();

        while(!potentionalNexts.isEmpty()){
            ChessTable current = potentionalNexts.pop();

            if(!current.hasMoreSteps()){
                if(current.reachedEnd())
                    winners.add(current);

                continue;
            }

            ChessTable[] nextMoves = current.getNextSteps();

            for (var nextMove : nextMoves) {
                potentionalNexts.push(nextMove);
            }
        }

        if(winners.isEmpty()){
            System.out.println("Could not find any solution :(");
            return;
        }

        System.out.println("Solutions: ");

        System.out.println();
        System.out.println();

        for (int i = 0; i < winners.size(); i++) {
            System.out.println("Solution " + (i + 1) + ":");
            System.out.println(winners.get(i));
        }
    }
}
