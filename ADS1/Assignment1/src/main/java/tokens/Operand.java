package tokens;

/**
 * Class for an operand token. It contains an integer value.
 */
@SuppressWarnings("ClassCanBeRecord") // I don't want to use records because nah.
public class Operand implements Token {
    /**
     * Creates an operand from an integer value
     * @param value The value of the operand
     * @return The operand
     */
    public static Operand from(int value) {
        return new Operand(value);
    }

    private final int value;

    /**
     * Creates an operand from an integer value
     * @param value The value of the operand
     */
    public Operand(int value) {
        this.value = value;
    }

    /**
     * Gets the value of the operand
     * @return The value of the operand
     */
    public int getValue() {
        return value;
    }
}
