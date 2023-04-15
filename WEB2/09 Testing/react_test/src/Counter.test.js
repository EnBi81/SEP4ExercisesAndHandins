import {fireEvent, render, screen} from '@testing-library/react';
import {Counter} from './Counter';

test('renders counter', () => {
    let {container} = render(<Counter />);
    const buttonElement = container.querySelector('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toBe('Increment')

    const counter = container.querySelector('div.counter-value');

    expect(counter).toBeInTheDocument();
    expect(counter.textContent).toBe('Counter: 0')
});

test('increment counter', () => {
    let {container} = render(<Counter />);
    const buttonElement = container.querySelector('button');
    const counter = container.querySelector('.counter-value');

    expect(counter).toBeInTheDocument();

    expect(counter.textContent).toBe('Counter: 0');


    fireEvent.click(buttonElement);
    expect(counter.textContent).toBe('Counter: 1');

    fireEvent.click(buttonElement);
    expect(counter.textContent).toBe('Counter: 2');

    fireEvent.click(buttonElement);
    expect(counter.textContent).toBe('Counter: 3');

    fireEvent.click(buttonElement);
    expect(counter.textContent).toBe('Counter: 4');

    fireEvent.click(buttonElement);
    expect(counter.textContent).toBe('Counter: 5');
});