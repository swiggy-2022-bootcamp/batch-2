fruits = ['apple','banana','chikoo','orange'];

// for loop
for(let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);;
}

// while loop
let i = 0;
while(i < fruits.length){
    console.log(fruits[i]);
    i++;
}

// do-while loop (executed at least once)
let x = 0;
do {
    console.log(fruits[x]);
    x++;
} while (x < fruits.length)