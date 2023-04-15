import {reverseString} from './reverse'

it('Reverse hello', () => {
    expect(reverseString('hello')).toBe('olleh');
})

it('Reverse Hello', () => {
    expect(reverseString('Hello')).toBe('olleH');
})

it('Reverse aaaaaaa', () => {
    expect(reverseString('aaaaaaa')).toBe('aaaaaaa');
})

it('Reverse `empty`', () => {
    expect(reverseString('')).toBe('');
})