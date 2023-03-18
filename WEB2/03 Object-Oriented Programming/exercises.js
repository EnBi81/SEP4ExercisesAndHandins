// Exercise 1

let createPoint = (x, y) => {
    return {
        getX: () => x,
        getY: () => y,
        moveTo: (moveX, moveY) => {
            x += moveX;
            y += moveY;
        },
        toString: () => `{${x}, ${y}}`,
    };
};

let createCircle = (point, radius) => {
    return {
        getCenterX: () => point.getX(),
        getCenterY: () => point.getY(),
        getRadius: () => radius,
        moveCenterTo: (moveX, moveY) => point.moveTo(moveX, moveY),
        toString: () => `Circle(Center: ${point.toString()}, Radius: ${radius})`,
    };
}

let circle = createCircle(createPoint(1, 2), 4);
console.log("should be 'Circle(Center: {1, 2}, Radius: 4)': ", circle.toString());

circle.moveCenterTo(3, 3);
console.log("should be 'Circle(Center: {4, 5}, Radius: 4)': ", circle.toString());


console.log();
console.log();

// Exercise 2

let circles = [
    createCircle(createPoint(0, 9), 10),
    createCircle(createPoint(1, 8), 20),
    createCircle(createPoint(2, 7), 30),
    createCircle(createPoint(3, 6), 40),
];

let radiuses = circles.map(c => c.getRadius());
console.log("should be [10, 20, 30, 40]", radiuses);


console.log();
console.log();

// Exercise 3

createCircle = ({x, y, radius, center}) => {
    if(center === undefined)
        center = createPoint(x, y);

    return {
        getCenterX: () => center.getX(),
        getCenterY: () => center.getY(),
        getRadius: () => radius,
        moveCenterTo: (moveX, moveY) => center.moveTo(moveX, moveY),
        toString: () => `Circle(Center: ${center.toString()}, Radius: ${radius})`,
    };
}

circle = createCircle({ x: 2, y: 2, radius: 5});
console.log("should be 'Circle(Center: {2, 2}, Radius: 5)': ", circle.toString());

circle = createCircle({ center: createPoint(6, 7), radius: 5});
console.log("should be 'Circle(Center: {6, 7}, Radius: 5)': ", circle.toString());


console.log();
console.log();

// Exercise 4

let createPerson = (name, age) => {
    return {
        getName: () => name,
        setName: newName => name = newName,
        getAge: () => age,
        setAge: newAge => age = newAge,
        toString: () => `Person(Name: ${name}, Age: ${age})`,
        equals: (p) => p.getName() === name && p.getAge() === age,
    };
};

let createEmployee = ({name, age, salary}) => {
    let person = createPerson(name, age);

    return {
        ...person,
        getSalary: () => salary,
        setSalary: newSalary => salary = newSalary,
        toString: () => `Employee(${person.toString()}, Salary: ${salary})`,
        equals: (e) => person.equals(this) && e.getSalary() === salary,
    };
};

let santa = createEmployee({ name: "Santa Clause", age: 1752, salary: 2 })
console.log("should be Employee(Person(Name: Santa Clause, Age: 1752), Salary: 2): ", santa.toString())


console.log();
console.log();

// Exercise 5

class Point {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX(){
        return this.#x;
    }

    getY(){
        return this.#y;
    }

    moveTo(x, y){
        this.#x += x;
        this.#y += y;
    }

    toString(){
        return `{${this.#x}, ${this.#y}}`;
    }
}

class Circle {
    #point;
    #radius;

    constructor(point, radius) {
        this.#point = point;
        this.#radius = radius;
    }

    getCenterX(){
        return this.#point.getX();
    }

    getCenterY(){
        return this.#point.getY();
    }

    getRadius(){
        return this.#radius;
    }

    moveCenterTo(x, y){
        this.#point.moveTo(x, y);
    }

    toString(){
        return `Circle(Center: ${this.#point.toString()}, Radius: ${this.#radius})`
    }
}

circle = new Circle(new Point(1, 2), 4);
console.log("should be 'Circle(Center: {1, 2}, Radius: 4)': ", circle.toString());


console.log();
console.log();

// Exercise 6

class Person{
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getAge() {
        return this.#age;
    }

    setAge(age) {
        this.#age = age;
    }

    toString() {
        return `Person(Name: ${this.#name}, Age: ${this.#age})`;
    }

    equals(p) {
        return p.getName() === this.#name && p.getAge() === this.#age;
    }
}

class Employee extends Person {
    #salary;

    constructor({name, age, salary}) {
        super(name, age);
        this.#salary = salary;
    }

    getSalary() {
        return this.#salary;
    }

    setSalary(salary) {
        this.#salary = salary;
    }

    toString() {
        return `Employee(${super.toString()}, Salary: ${this.#salary})`
    }

    equals(e) {
        return super.equals(e) && e.getSalary() === this.#salary;
    }
}

santa = createEmployee({ name: "Santa Clause", age: 1753, salary: 3 })
console.log("should be Employee(Person(Name: Santa Clause, Age: 1753), Salary: 3): ", santa.toString())


console.log();
console.log();

// Exercise 7

class Vec {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vec) {
        return new Vec(vec.x + this.x, vec.y + this.y);
    }

    minus(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

console.log("should be Vec{x: 3, y: 5}: ", new Vec(1, 2).plus(new Vec(2, 3)));
console.log("should be Vec{x: -1, y: -1}: ", new Vec(1, 2).minus(new Vec(2, 3)));
console.log("should be 5: ", new Vec(3, 4).length);


console.log();
console.log();

// Exercise 8

let obj = { one: true, two: true, hasOwnProperty: true }

// Fix this call
console.log("should be true: ", Object.getOwnPropertyNames(obj).some(p => p === "one"))
console.log("should be false: ", Object.getOwnPropertyNames(obj).some(p => p === "three"))
