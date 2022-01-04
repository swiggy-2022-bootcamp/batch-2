/*Problem statement:
 marks: 
 < 51 -> C
 51-70 -> B
 71-90 -> A
 > 91 -> A+
 alert msgs
*/




var marks=60
if(marks<50)
{
    alert("Your Grade is 'C' ")
}
else if(marks>50 && marks<=70)
{
    alert("Your Grade is 'B'")
}
else if(marks>70 && marks<=90)
{
    alert("Great, you got the 'A' grade")
}
else
{
    alert("Outstanding....You Achieved A+")
}
