// top down execution

// for loop
// to iterate over items
// to repeat work
for (let i=0;i<5;i++)
{
    console.log(i);
}

// alert grade based on marks
let marks = 75;
if(marks > 90)
{//true case
    alert("grade is A");
}
else if (marks > 80)
{
    alert("grade is B");
    
}
else if (marks > 70)
{
     alert("grade is C");
}
else if (marks > 60)
{
    alert("grade is D");

}
else
{
    alert("sorry grade is fail")
}
// switch( condition)

// terneary operator
let a = 5;
let b = 3;
result = a>b ? 1:2;
console.log(result);

// pre increment
// ++a
// post incrmeent
// a++
// list can be heterogeneuos
list1 = ["a","b","c","d",5,"e"];
list1.push("pusheditem1");
// using length property
for (let i=0;i<list1.length;i++)
{
    console.log(list1[i]);
}

// declare an array which contains 5 marks
let markslist = [40,87,67,95,43];
// find sum,min,max
// count of pass and fail
// less than 50 means fail
let sumofmarks = 0;
let passcount = 0;
let failcount = 0;
let minmarks = 101;
let maxmarks = 0;
for(let i=0;i<markslist.length;i++)
{
sumofmarks += markslist[i];
if (markslist[i]>maxmarks)
{
    maxmarks = markslist[i];
}
if (markslist[i]<minmarks)
{
    minmarks = markslist[i];
}
if (markslist[i]<50)
{
    failcount +=1;
}
else
{
    passcount +=1;
}
}
console.log("sum of marks",sumofmarks);
console.log("minimum marks is ",minmarks);
console.log("maximum marks is ",maxmarks);
console.log("number of subjects passed is ",passcount);
console.log("number of subjects passed  is ",failcount);

