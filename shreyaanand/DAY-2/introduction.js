let val = 50

if(val > 100){
    alert("True")
}
else{
    alert("False")
}

mark = [60, 90, 75, 80]
let marks = 0;

for(let i = 0; i<4; i++){
    marks+=mark[i]
}

marks = marks/4


if(marks>80){
    alert(" Grade A ")
}
else if(marks>=70){
    alert(" Grade B ")
}
else if(marks>=60){
    alert(" Grade C ")
}
else if(marks>=50){
    alert(" Grade D ")
}
else{
    alert(" Grade F ")
}