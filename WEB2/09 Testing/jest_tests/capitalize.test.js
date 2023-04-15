import {capitalize} from './capitalize'

it('Capitalize hello', () => {
    expect(capitalize('hello')).toBe('Hello');
})

it('Capitalize Hello', () => {
    expect(capitalize('Hello')).toBe('Hello');
})

it('Capitalize aaaaaaa', () => {
    expect(capitalize('aaaaaaa')).toBe('Aaaaaaa');
})

it('Capitalize `empty`', () => {
    expect(capitalize('')).toBe('');
})