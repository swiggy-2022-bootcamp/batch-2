let ListOfMarks=[45,97,68,79,43,38]
let max_marks=Math.max(...ListOfMarks)
let min_marks=Math.min(...ListOfMarks)
console.log(`Maximum Marks is ${max_marks}`)
console.log(`Minimum Marks is ${min_marks}`)
let TotalMarks=0
for(i=0;i<ListOfMarks.length;i++)
{
    TotalMarks+=ListOfMarks[i];
}
console.log(`Total Marks is ${TotalMarks}`)