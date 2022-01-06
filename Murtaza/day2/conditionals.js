//Conditional Statements
//top down execution


for (i=0; i<=50000; i++) {
    console.log("hello");
}

condition = true;
if (condition) {
    console.log("Phew the loop finally ended !");
}

/*Problem statement:
    marks: 
    < 50 -> F
    50-60 -> D
    60-70 -> C
    70-80 -> B
    > 80 -> A

    alert msgs
*/

condition1 = true;
condition2= false;
condition3 = true;

//if-else-if ladder
if (condition1) {

} else if (condition2) {

} else if (condition3) {

}

switch (choice) {
    case 1: break;
    case 2: break;
    default: break;
}

if (condition) {
    //return val1
} else {
    //return val2
}

result = condition ? val1 : val2;

//--- loops
// 3 kinds:
// - for [definite]

list = ['apple', 200, 'chickoo', 'orange', 'mango'];
for ( i=0; i<5; i++) {
    console.log(list[i]);
}


// - while [indefinite]
list = ['apple', 200, 'chickoo', 'orange', 'mango'];
i = 0;
while (i<5) {
    console.log(list[i]);
    i++;
}


// - do while [indefinite]
list = ['apple', 200, 'chickoo', 'orange', 'mango'];
i = 0;
do {
    console.log(list[i]);
    i++;
} while (i<5);




