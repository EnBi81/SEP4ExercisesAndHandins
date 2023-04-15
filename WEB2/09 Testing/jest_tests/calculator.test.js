import {calculator} from './calculator'

it('Add 2 and 4', () => {
    expect(calculator.add(2, 4)).toBe(6);
})

it('Add 5 and 3', () => {
    expect(calculator.add(5, 3)).toBe(8);
})

it('Add 0 and 1', () => {
    expect(calculator.add(0, 1)).toBe(1);
})


it('Multiply 2 and 4', () => {
    expect(calculator.multiply(2, 4)).toBe(8);
})

it('Multiply 5 and 3', () => {
    expect(calculator.multiply(5, 3)).toBe(15);
})

it('Multiply 0 and 1', () => {
    expect(calculator.multiply(0, 1)).toBe(0);
})


it('Divide 2 and 4', () => {
    expect(calculator.divide(2, 4)).toBe(0.5);
})

it('Divide 5 and 3', () => {
    expect(calculator.divide(5, 3)).toBe(5 / 3);
})

it('Divide 0 and 1', () => {
    expect(calculator.divide(0, 1)).toBe(0);
})


it('Subtract 2 and 4', () => {
    expect(calculator.subtract(2, 4)).toBe(-2);
})

it('Subtract 5 and 3', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
})

it('Subtract 0 and 1', () => {
    expect(calculator.subtract(0, 1)).toBe(-1);
})
