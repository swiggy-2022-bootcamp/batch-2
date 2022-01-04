//conditional statement

let marks = 75

/*if(marks < 50){
    alert("Fail")
}else if(marks>=50 && marks < 60){
    alert("Grade D")
}else if(marks >= 60 && marks < 70){
    alert("Grade C")
}else if(marks>= 70 && marks < 80){
    alert("Grade B")
}else{
    alert("Grade A")
}*/

/*switch(choice){

}*/

//loops and arrays
let cars = ["Totyota", "Volvo", "BMW", 200];
for(let i=0;i<cars.length;i++){
    console.log(cars[i])
}
cars.push("Honda")

let marksList = [20, 30, 45, 67,23]
let passStudentCount = 0, failStudentCount = 0
totalMarks = 0
for(let i=0;i<marksList;i++){
    if(marksList[i]< 50){
        failStudentCount++
    }else{
        passStudentCount++
    }
    totalMarks += marksList[i]
}
console.log("average marks: ", totalMarks/marksList.length)
console.log("number of students passed: ", passStudentCount)
console.log("number of students failed: ", failStudentCount)
console.log("max marks: ", Math.max(...marksList))
console.log("min marks: ", Math.min(...marksList))


