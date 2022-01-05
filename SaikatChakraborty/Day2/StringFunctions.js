let str ="Saikat is in swiggy i++";
let length=str.length;
//.length similar to arrays

/**
 * Extracting Substrings from the original String
 * 1. slice(start,end)
 * 2. substring(start,end)
 * 3. substr(start,end)
 */
console.log(str.slice(0,5));
console.log(str.slice(-5,-7));//Counts from the end

//Omitting the second param slices out the entire string from that index
console.log(str.slice(3));
//Similar functionality is achieved by substring() and substr()
console.log(str.slice(2,5)==str.substring(2,5));

/**
 * replacing string content
 * replace() 
 */
let txt="My name is Saikat!!";
let nextTxt=txt.replace("Saikat","Saransh");
console.log(nextTxt);
//Replaces only the first occurence of the substring provided
//It is also Case sensitive 
console.log(txt.replace("Name","NAME"));

/**
 * To Replace case insensitive use /i flag (insensitive)
 * To Replace all occurence use /g flag (global expression) 
 */
let string1="Please visit Swiggy and Swiggy!!";
console.log(string1.replace("/Swiggy/g","Swiggy Office"));


/**
 * Converting to UpperCase or LowerCase 
 * toUpperCase() and toLowerCase() functions used
 */

let string2="Hello!!";
console.log(string2.toUpperCase());
console.log(string2.toLowerCase());

/**
 * concat() joins two strings together
 */
let string3="Hello";
let string4="World";
console.log(string3.concat(string4));
//+ Operater can be used for the same 
console.log(string3+string4);

/**
 * trim() method removes white space from both sides of a string 
 */
let string5="    My name is Saikat!!   ";
console.log(string5.trim());

/**
 * Extracting string Characters 
 * 1. charAt(pos)
 * 2. charCodeAt(pos)
 * 3. Property Access []
 */
let string6=string5.trim();
console.log("String:->My name is Saikat!!","CharAt(5):",string6.charAt(5),
"charCodeAt(5):",string6.charCodeAt(5),"Property Access:",string6[5]);
//Remember Proerty Access cannot change a char At a certain position

string6[2]='1';
console.log(string6);
//String 6 remains the same

/**
 * Converting a String into an Array
 * split() fucntion
 */
let string7="Cat,Dog,Mouse,Hen,Chicken";
let list=string7.split(",");
//','  acts as a delimiter 
//Print the list on separate lines 
for(i=0;i<list.length;i++){
    console.log(list[i]+"\n");
}


/**
 * JS String Searching Methods
 * 1. String indexOf() --> Returns the first index of the specified substring
 * 2. String lastIndexOf() --> Returns the last index of the specified substring
 * 3. String search()--> Can search reguar expression
 * All these return -1 when the substring is not present
 * 
 */

let string8="Please find where Saikat occurs in this string having Saikat";
console.log("First index of Saikat : ",string8.indexOf("Saikat"));
console.log("Last index of Saikat : ",string8.lastIndexOf("Saikat"));
//Can be used to speciifed a position from which the string is searched
console.log(string8.indexOf("Please",8));
console.log(string8.lastIndexOf("Saikat",15));
console.log(string8.indexOf("OF"));


/**
 * JS String match() function 
 * input : takes in a Regexp
 * output : Provides an Array of matches 
 */

let string9="Saikat is in Swiggy i++ batch2 He is in ETCe deptt";
let matches =string9.match(/in/g);
for(i=0;i<matches.length;i++){
    
    console.log(matches[i]+"\n")
}
//Global, case-insensitive search for "in":

let string10 = "The rain in SPAIN stays mainly in the plain";
let matches2=string10.match(/in/gi);
for(i=0;i<matches2.length;i++){
    console.log(matches2[i]+"\n");
}

/**
 * String includes() function returns true if a string contains a specified value
 */
let string11="Hello World";
string12="Hello";
if(string11.includes(string12)){
    console.log(string11," Contains ",string12);
} else {
    console.log(string11, " Contains ",string12);
}

/**
 * String Prefix and Suffix Search
 * startsWith() function checks whether given substring is a prefix of the original string.
 * endsWith() function checks whether given substring is a suffix of the original string. 
 */

let string13="Saikat Chakraborty";
let string14="Saikat";
let string15="Chakraborty";
console.log(string13.startsWith(string14));
console.log(string13.endsWith(string15));
console.log(string13.startsWith(string15));



/**
 * JS Backtick literals 
 * Adv: Can use quotes inside backticks 
 * put variable substitutions inside backticks 
 * put expression substitution
 */
let string16=`Hello "World!"`;
console.log(string16);
let string17="Saikat";
let string18="Chakraborty";
console.log(`Welcome ${string17} ${string18}`);

let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;







