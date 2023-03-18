// Exercise 1

function squareList(array) {
    return array
        .filter(num => num > 0 && num % 1 === 0 )
        .map(num => num * num);
}

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2])
console.log("should be [25, 9]: ", squaredIntegers);


console.log();
console.log();

// Exercise 2

let arrays = [[1, 2, 3], [4, 5], [6]];

let flattenedArray = arrays.reduce((arr, subArray) => {
    arr.push(...subArray);
    return arr;
}, []);


console.log("should be [1, 2, 3, 4, 5, 6]: ", flattenedArray);


console.log();
console.log();

// Exercise 3

function loop(value, test, update, body){
    for (let i = value; test(i); i = update(i)) {
        body(i)
    }
}

console.log("Should be 3 2 1")
loop(
    3,
    n => n > 0,
    n => n - 1,
    console.log
)


console.log();
console.log();

// Exercise 4

function alphabeticalOrder(array) {
    let copyArr = [...array];
    copyArr.sort((a, b) => a.localeCompare(b));
    return copyArr;
}

const letters = ["a", "d", "c", "a", "z", "g"]

console.log("should be [\"a\", \"a\", \"c\", \"d\", \"g\", \"z\"]: ", alphabeticalOrder(letters));
console.log("should be [ \"a\", \"d\", \"c\", \"a\", \"z\", \"g\"]: ", letters);


console.log();
console.log();

// Exercise 5

function urlSlug(title) {
    return title.split(" ").join("-").toLowerCase();
}

let titleText = "A Mind Needs Books Like A Sword Needs A Whetstone"
console.log("should be a-mind-needs-books-like-a-sword-needs-a-whetstone: ", urlSlug(titleText));
console.log("should be A Mind Needs Books Like A Sword Needs A Whetstone: ", titleText);


console.log();
console.log();

// Exercise 6

function checkPositive(arr) {
    return arr.some(value => value > 0)
}

console.log("should be true: ", checkPositive([1, 2, 3, -4, 5]))
console.log("should be false: ", checkPositive([-1, -2, -3, -4, -5]))


console.log();
console.log();

// Exercise 7

function every(array, test) {
    return !array.some(value => !test(value));
}

console.log("should be true: ", every([1, 3, 5], n => n < 10))
// → true
console.log("should be false: ", every([2, 4, 16], n => n < 10))
// → false
console.log("should be true: ", every([], n => n < 10))
// → true


console.log();
console.log();

// Exercise 8

require("./scripts.js")

function oldestLivingScript(scripts) {
    return scripts.reduce((oldestScript, current) => {
        if(!current.living)
            return oldestScript;

        if(oldestScript.year <= current.year)
            return oldestScript;
        return current;
    })
}

console.log("should be Han: ", oldestLivingScript(SCRIPTS).name);


console.log();
console.log();

// Exercise 9

function rtlScriptNames(scripts) {
    return scripts.filter(s => s.direction === "rtl").map(s => s.name);
}
function rtlScriptNamesReduce(scripts) {
    return scripts.reduce((rtlArr, current) => {
        if(current.direction === "rtl")
            rtlArr.push(current.name);

        return rtlArr;
    },[]);
}

console.log("should be [ \"Adlam\", \"Arabic\", \"Imperial Aramaic\", ... ]: ", rtlScriptNames(SCRIPTS))
console.log("should be [ \"Adlam\", \"Arabic\", \"Imperial Aramaic\", ... ]: ", rtlScriptNamesReduce(SCRIPTS))


console.log();
console.log();

// Exercise 10

function dominantDirection(text) {
    let arr = []
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let chScript = characterScript(charCode);
        if(chScript != null)
            arr.push(chScript);
    }

    let counts = countBy(arr, item => item.name);
    let language = counts.reduce((biggestItem, current) => biggestItem.count > current.count ? biggestItem : current);
    language = SCRIPTS.filter(l => l.name === language.name);

    return language[0]?.direction;
}

function countBy(items, groupName) {
    let counts = []
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name === name)
        if (known === -1) {
            counts.push({ name, count: 1 })
        } else {
            counts[known].count++
        }
    }
    return counts
}

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (
            script.ranges.some(([from, to]) => {
                return code >= from && code < to
            })
        ) {
            return script
        }
    }
    return null
}

console.log("should be ltr: ", dominantDirection("Hello!"));
console.log("should be rtl: ", dominantDirection("Hey, مساء الخير"));