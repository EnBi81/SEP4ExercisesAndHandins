import {useState} from "react";

export function Counter(){
    let [counter, setCounter] = useState(0);

    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
            <div className={'counter-value'}>Counter: {counter}</div>
        </div>
    )
}