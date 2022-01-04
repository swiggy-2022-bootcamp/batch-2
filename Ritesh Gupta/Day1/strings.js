// String methods
// substring from position 7 to position 12 :
let str = "Apple, Banana, Mango, Tomato";
let part = str.substring(7, 13);
console.log(str)
console.log(part)

// replace a word in a string
let text = "Hello John, how are you";
let newText = text.replace("John", "Ritesh Gupta");
console.log(newText)

// upper and lowercase conversion
let text1 = "Hello World!";
let text2 = text1.toUpperCase();
console.log(text2)

let text3 = "Hello World!";       
let text4 = text1.toLowerCase(); 
console.log(text4);


// string concatination
let firstName = "Ritesh"
let lastName = "Gupta"
let fullName = firstName + " " + lastName;
console.log(fullName);


// split method to get an array
let fruitString = "Apple, Mango, Banana"
let fruitList = fruitString.split(",");
console.log(fruitList)

