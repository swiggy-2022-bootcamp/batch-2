for (i=0; i<=50000; i++) {
    console.log("hello");
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