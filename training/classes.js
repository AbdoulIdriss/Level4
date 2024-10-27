// class Animal {}

// var myCat = Object.create(Animal)

// console.log(Animal);


// class Animal {}

// var myDog = new Animal()

// console.log(Animal);

// function defaultParams( number = 10 ) {
//     console.log('result is ', number * number );
// }
// defaultParams();


//without default params
class NoDefaultParams {

    constructor(num1, num2 , string1, bol1) {
        this.num1 = num1,
        this.num2 = num2,
        this.string1 = string1,
        this.bol1 = bol1
    }

    calcluate () {
        
        if (this.bol1) {
            console.log(num1 + num2 , string1,)
            return;
        }
        return console.log("the value of bol1 is incorrect");
        
    }
}

var res = new NoDefaultParams( 1 , 2 , 'string' , false )

res.calcluate()

//default params 
class DefaultParams {

    constructor(num1 =1 , num2 = 2 , string1 = 'string', bol1 = true) {
        this.num1 = num1,
        this.num2 = num2,
        this.string1 = string1,
        this.bol1 = bol1
    }

    calcluate () {
        
        if (this.bol1) {
            console.log(this.num1 + this.num2 , this.string1,)
            return;
        }
        return "the value of bol1 is incorrect"
    }
}

var res = new DefaultParams()

res.calcluate();



class Animal {
    constructor(color = 'yellow', energy = 100) {
        this.color = color;
        this.energy = energy;
    }
    isActive() {
        if(this.energy > 0) {
            this.energy -= 20;
            console.log('Energy is decreasing, currently at:', this.energy)
        } else if(this.energy == 0){
            this.sleep();
        }
    }
    sleep() {
        this.energy += 20;
        console.log('Energy is increasing, currently at:', this.energy)
    }
    getColor() {
        console.log(this.color)
    }
}

class Cat extends Animal {
    constructor(sound = 'purr', canJumpHigh = true, canClimbTrees = true, color, energy) {
        super(color, energy);
        this.sound = sound;
        this.canClimbTrees = canClimbTrees;
        this.canJumpHigh = canJumpHigh;
    }
    makeSound() {
        console.log(this.sound);
    }
}

class Bird extends Animal {
    constructor(sound = 'chirp', canFly = true, color, energy) {
        super(color, energy);
        this.sound = sound;
        this.canFly = canFly;
    }
    makeSound() {
        console.log(this.sound);
    }
}

class HouseCat extends Cat {
    constructor(houseCatSound = "meow", sound,canJumpHigh,canClimbTrees, color,energy) {
        super(sound,canJumpHigh,canClimbTrees, color,energy);
        this.houseCatSound = houseCatSound;
    }
    makeSound(option) {
        if (option) {
            super.makeSound();
        }
        console.log(this.houseCatSound);
    }
}

class Tiger extends Cat {
    constructor(tigerSound = "Roar!", sound,canJumpHigh,canClimbTrees, color,energy) {
        super(sound,canJumpHigh,canClimbTrees, color,energy);
        this.tigerSound = tigerSound;
    }
    makeSound(option) {
        if (option) {
            super.makeSound();
        }
        console.log(this.tigerSound);
    }
}

class Parrot extends Bird {
    constructor(canTalk = false, sound,canFly, color,energy) {
        super(sound,canFly, color,energy);
        this.canTalk = canTalk;
    }
    makeSound(option) {
        if (option) {
            super.makeSound();
        }
        if (this.canTalk) {
            console.log("I'm a talking parrot!");
        }
    }
}

var fiji = new Parrot(false); // we're passing `false` to the constructor so that fiji can't talk
var polly = new Parrot(true); // we're passing `true` to the constructor so that polly can talk

fiji.makeSound(); // undefined
fiji.makeSound(true); // chirp

polly.makeSound(); // I'm a talking parrot!
polly.makeSound(true); // chirp, I'm a talking parrot!

polly.color; // yellow
polly.energy; // 100

polly.isActive(); // Energy is decreasing, currently at: 80

var penguin = new Bird("shriek", false, "black and white", 200); // setting all the custom properties
penguin; // Bird {color: 'black and white', energy: 200, sound: 'shriek', canFly: false }

penguin.sound; // 'shriek'
penguin.canFly; // false
penguin.color; // 'black and white'
penguin.energy; // 200
penguin.isActive(); // Energy is decreasing, currently at: 180

var leo = new HouseCat();

// leo, no purring please:
leo.makeSound(false); // meow
// leo, both purr and meow now:
leo.makeSound(true); // purr, meow

var cuddles = new Tiger();
cuddles.makeSound(false); // Roar!
cuddles.makeSound(true); // purr, Roar!


const car = {
    engine : true,
    steering: true ,
    speed : 'slow'
}

for (props in car ) {
    console.log(props);
    
}

for (props of Object.values(car) ) {
    console.log(props)
}

//map 
let bestCook = new Map()

bestCook.set ( 1 , "the champion")
bestCook.set(2 , 'the runover')
console.log(bestCook);
//to get a specific value, use bestCook.get(desired value). example
bestCook.get(1)
console.log(bestCook.get(1));

//using the set
const repetitiveFruits = ['apple','pear','apple','pear','plum', 'apple'];
const uniqueFruits = new Set(repetitiveFruits);
console.log(uniqueFruits);


// Here's how to use the spread operator to easily add one or more members to an existing array:
let veggies = ['onion', 'parsley'];
veggies = [...veggies, 'carrot', 'beetroot'];
console.log(veggies);


// Convert a string to an array using the spread operator
// Given a string, it's easy to spread it out into separate array items:
const greeting = "Hello";
const arrayOfChars = [...greeting];
console.log(arrayOfChars); //  ['H', 'e', 'l', 'l', 'o']

// Copy either an object or an array into a separate one
// Here's how to copy an object into a completely separate object, using the spread operator.
const car1 = {
    speed: 200,
    color: 'yellow'
}
const car2 = {...car1}

car1.speed = 201

console.log(car1.speed, car2.speed)
// You can copy an array into a completely separate array, also using the spread operator, like this:
const fruits1 = ['apples', 'pears']
const fruits2 = [...fruits1]
fruits1.pop()
console.log(fruits1, "not", fruits2)