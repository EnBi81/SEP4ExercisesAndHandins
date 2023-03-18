// Exercise 2

let text = ""
for (let i = 1; i < 8; i++) {
    text += "#"
    console.log(text)
}

console.log()
console.log()

// Exercise 3

for (let i = 1; i <= 100; i++) {
    if(i % 15 === 0)
        console.log("FizzBuzz");
    if(i % 3 === 0)
        console.log("Fizz");
    else if(i % 5 === 0)
        console.log("Buzz");
    else
        console.log(i);
}

console.log()
console.log()

// Exercise 4

function min(a, b){
    if (a < b)
        return a;
    return b;
}

console.log("should be 0: " + min(0, 10))
// → 0
console.log("should be -10: " + min(0, -10))
// → -10


console.log()
console.log()

// Exercise 5

function countBs(text){
    let count = 0;
    for (const c of text) {
        if(c === 'B')
            count++;
    }

    return count;
}

console.log("should be 2: " + countBs("BBC"));

function countChar(text, char){
    let count = 0;
    for (const c of text) {
        if(c === char)
            count++;
    }

    return count;
}

console.log("should be 4: " + countChar("kakkerlak", "k"))


console.log()
console.log()

// Exercise 6

function range(from, to){
    let arr = [];
    for (let i = from; i <= to; i++) {
        arr[arr.length] = i;
    }

    return arr;
}

function sum(arr){
    let sum = 0;
    for (const arrElement of arr) {
        sum += arrElement;
    }

    return sum
}

console.log("should be 55: " + sum(range(1, 10)));

function rangeStep(from, to, step){
    if(step === undefined)
        step = 1;

    let arr = [];
    for (let i = from;
         step > 0 ? i <= to : i >= to;
         i += step) {
        arr[arr.length] = i;
    }

    return arr;
}

console.log("should be [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]: ", range(1, 10));
console.log("should be [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]: ", rangeStep(1, 10));
console.log("should be [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]: ", rangeStep(1, 10, 1));
console.log("should be [5, 4, 3, 2]: ", rangeStep(5, 2, -1));


console.log()
console.log()

// Exercise 7

function rangeCurry(from){
    return function(to){
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr[arr.length] = i;
        }

        return arr;
    }
}

let rangeFrom3To = rangeCurry(3);
let rangeFrom7To = rangeCurry(7);

console.log("should be [3]: ", rangeFrom3To(3));
console.log("should be [3,4,5,6,7,8]: ", rangeFrom3To(8));
console.log("should be [7,8,9]: ", rangeFrom7To(9));


console.log();
console.log();

// Exercise 8

function reverseArray(arr){
    let reversedArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversedArr.push(arr[i]);
    }

    return reversedArr;
}

function reverseArrayInPlace(arr){
    let reversedI = arr.length;
    for (let i = 0; i < arr.length && i < reversedI; i++) {
        reversedI = arr.length - i - 1;

        let temp = arr[i];
        arr[i] = arr[reversedI];
        arr[reversedI] = temp;
    }
}

console.log("should be [\"C\", \"B\", \"A\"]: ", reverseArray(["A", "B", "C"]));

let arrayValue = [1, 2, 3, 4, 5]
reverseArrayInPlace(arrayValue)
console.log("should be [5, 4, 3, 2, 1]: ", arrayValue)


console.log()
console.log()

// Exercise 9


function arrayToList(arr){
    if(arr.length === 0)
        return { value: null, rest: null };
    let head = { value: arr[0], rest: null };
    let listNode = head;
    for (let i = 1; i < arr.length; i++) {
        let arrItem = arr[i];

        let newNode = { value: arrItem, rest: null };
        listNode.rest = newNode;
        listNode = newNode;
    }

    return head;
}

console.log("should be {value: 10, rest: {value: 20, rest: null}}: ", arrayToList([10, 20]))

function listToArray(list){
    let arr = [];

    let listNode = list;
    while(listNode != null){
        arr.push(listNode.value);
        listNode = listNode.rest;
    }

    return arr;
}

console.log("should be [10, 20, 30]: ", listToArray(arrayToList([10, 20, 30])))

function prepend(element, list){
    return { value: element, rest: list };
}

console.log("should be {value: 10, rest: {value: 20, rest: null}}: ", prepend(10, prepend(20, null)))

function nth(list, index){
    let listNode = list;
    let innerIndex = -1;

    while(listNode != null){
        innerIndex++;
        if(index === innerIndex)
            return listNode.value;

        listNode = listNode.rest;
    }

    return undefined;
}

console.log("should be 20: ", nth(arrayToList([10, 20, 30]), 1))
console.log("should be undefined: ", nth(arrayToList([10, 20, 30]), 3))

function nthRecursive(list, index){
    let currentIndex = arguments[2];
    if(currentIndex === undefined)
        currentIndex = 0;

    if(list == null)
        return undefined;

    if(currentIndex === index)
        return list.value;

    return nthRecursive(list.rest, index, currentIndex + 1);
}

console.log("should be 20: ", nthRecursive(arrayToList([10, 20, 30]), 1))
console.log("should be undefined: ", nthRecursive(arrayToList([10, 20, 30]), 3))


console.log()
console.log()

// Exercise 10

function deepEqual(obj1, obj2){
    if(obj1 === obj2)
        return true;

    if(obj1 == null)
        return obj2 == null;

    if(Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;

    for (const key of Object.keys(obj1)) {
        if(!deepEqual(obj1[key], obj2[key]))
            return false;
    }

    return true;
}

let obj = { here: { is: "an" }, object: 2 }
console.log("should be true: ", deepEqual(obj, obj))
console.log("should be false: ", deepEqual(obj, { here: 1, object: 2 }))
console.log("should be true: ", deepEqual(obj, { here: { is: "an" }, object: 2 }))