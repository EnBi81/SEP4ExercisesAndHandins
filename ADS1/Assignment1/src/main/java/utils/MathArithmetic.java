package utils;

/**
 * Interface for a generic math operation.
 * @param <T> The type of the numbers to be operated on.
 */
public interface MathArithmetic<T> {
    /**
     * Applies the operation to the two numbers.
     * @param a The first number.
     * @param b The second number.
     * @return The result of the operation.
     */
    T apply(T a, T b);
}
