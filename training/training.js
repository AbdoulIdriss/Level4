// var score = 8

// console.log( 'mid-level-skills: ', score > 0 && score <10 );

// var timeRemaining = 3;
// var energy = 10;

//  console.log('Game over:', timeRemaining == 0 || energy == 0)

//  var num1 = 2;
//  var num2 = 5;

//  var test1 = num1 % 2;
//  var test2 = num2 % 2;

//  var result1 = test1 == 0;
//  var result2 = test2 == 0;

// console.log('is ', num1, 'an even number?', result1);
// console.log('is ', num2, 'an even number?', result2);

// if (num2 % 2 == 0) {
//     console.log('its even');   
// } else {
//     console.log('its odd');   
// }

// //switch case 

// var light = 'black';
// switch (light) {
//     case 'green':
//         console.log('You can cross');
//         break;
//     case 'red':
//         console.log('dont cross');
//         break;
//     case 'orange':
//         console.log('hurry up');
//         break;
//     default:
//         console.log('its neither green nor red nor yellow');
//         break;   
// }

// var age = 18;

// if (age >= 65 ) {
//     console.log('you get your income from your pension');   
// }else if (age < 65 && age >= 18 ) {
//     console.log(' Each month you get your salary');   
// }else if (age < 18 ) {
//    console.log('you get allowance');
// }else {
//     console.log('the value of the age is not numerical');
// }

// var day = 'january';

// switch (day) {
//     case 'monday':
//         console.log('Go to ActiveSpaces');
//         break;
//     case 'tuesday':
//         console.log('go to school');
//         break;
//     case 'wednesday':
//         console.log('stay home and study');
//         break;
//     case "thursday":
//         console.log('go to school again');
//         break;
//     case 'friday':
//         console.log('school again');
//         break;
//     case 'saturday':
//         console.log('stay home and work');
//         break;
//     case 'sunday':
//         console.log('stay home and work again');
//         break;
//     default:
//         console.log("there's no such day");
//         break;
        
// }


// var date = 2018;
//  while ( date < 2023 ) {
//     console.log(date);
//     date++; 
//  }
// console.log('great job');
 
// var cubes = 'ABCDEFG';
// //styling console output using CSS with a %c format specifier
// for (var i = 0; i < cubes.length; i++) {
//     var styles = "font-size: 40px; border-radius: 10px; border: 1px solid blue; background: pink; color: purple";
//     console.log("%c" + cubes[i], styles)
// }
// // for (var t = 0; t <= 10 ; t++) {
// //     console.log(t);   
// // }

// for (var i = 1; i <= 5 ; i++) {
//     console.log(i);   
// }
// console.log('counting completed');

// for( var t = 5 ; t > 0; t--) {
//     console.log(t);
// }
// console.log('done counting');

// var s = 1;
// while( s < 6) {
//     console.log(s);
//     s++;    
// }
// console.log('done');

// var f = 5;
// while ( f > 0 ) {
//     console.log(f);
//     f = f - 1;  
// }
// console.log('over');



// var s = 3 ;
//  while( s > 0) {
//     console.log(s);
//     s = s - 1;
// }
// console.log('iiiineee');


//function which will be able to take a word and locate the position of a chosen letter in that given word.
function letterFinder (word , match) {

    for (var i = 0; i < word.length; i++) {

        if (word[i] == match) {

            console.log('found the', match, 'at', i);          
        }else {
            console.log("no match found at", i);
            
        }
    }
}
letterFinder('test', 't')

// var car = {
//     a: 'aston martin',
//     b: 'bmw',
//     c: 'chevrolet'
// }
// console.log(car);

var bus = {};
bus.brand = 'Mercredes'
bus.price = 2000

console.log(bus);

var car = {};
car.color = "red";
car["color"] = "green";
car["speed"] = 200;
car.speed = 100;
console.log(car);

// With the brackets notation, I can add space characters inside property names, like this:  
car['number of doors'] = 4;
console.log(car);
// Additionally, I can add numbers (as the string data type) as property keys: 
car['2022'] = 1999;
console.log(car);

//push method

var fruits = []

fruits.push('orange')
fruits.push('banana')
console.log(fruits);

//pop can be used to remove the last item of an array
fruits.pop()
console.log(fruits);

var clothes = [];
clothes.push('jogging', 'baggy', 't-shirt', 'chemise', 'sneakers');
clothes.pop() // pop() removes the last item of the array
console.log(clothes)
clothes.push('air-force');
console.log(clothes)
console.log(clothes[2])

var favCar = {};
favCar.color = 'black'
favCar.convertible = true;
console.log(favCar);



function addTwoNumbers (a , b ) {
    try {
     if (typeof (a) != 'number') {
         throw new ReferenceError('the first argument aint a number')
     }else if(typeof (b) != 'number') {
         throw new ReferenceError('the second argument aint a number')
     } else {
         console.log( a + b );
     }
 
    } catch (err) {
     
     console.log('Error!' , err);
     
    }
     
 }
 addTwoNumbers( 5 , '6')
 console.log('it still works');
 
 /*
 Here are the tasks to complete:
 
 1-Just above the for loop in the letterFinder function definition, declare a variable named condition1 and assign to it the following code: typeof(word) == 'string' && word.length >= 2.
 2-Declare a variable named condition2 on the next line and assign to it and assign to it a check that makes sure that the type of match is a string AND that the length of the match variable is equal to 1.
 3-Write an if statement on the next line that checks that condition1 is true, and condition2 is true
 4-Move the rest of the function's body into the if statement you wrote in the previous step.
 5-Code an "else" block after the "if" condition and console.log the following: "Please pass correct arguments to the function.".
 6-As a failing test, run the letterFinder function and pass it with any two numbers as arguments.
 7-As a passing test, run the letterFinder function and pass it with correct arguments, such as: letterFinder("cat", "c").
 
 */
 
 function letterFinder(word, match) {
     var condition1 = typeof(word) == 'string' && word.length >= 2;
     var condition2 = typeof(match) == 'string' && match.length == 1;
     if(condition1  && condition2) {
 
         for(var i = 0; i < word.length; i++) {
             if(word[i] == match) {
             //if the current character at position i in the word is equal to the match
             console.log('Found the', match, 'at', i)
             } else {
             console.log('---No match found at', i)
             }
         }
 
     } else {
         console.log('please pass correct arguments to the function')
     }
 }
 letterFinder("cat","c")
