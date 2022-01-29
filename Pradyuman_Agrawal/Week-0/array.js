let arr=[34,56,76,54,60]

let min=arr[0],max=arr[0],sum=0,totalFail=0,totalPass=0

for(const a of arr){
    console.log(a)
    if(a<min)
        min=a;
    else if(a>max)
        max=a;
    sum+=a;
    if(a>=50)
        totalPass++
    else    
        totalFail++;
}
console.log(`Min score was ${min}`)
console.log(`Max score was ${max}`)
console.log(`Sum score was ${sum}`)
console.log(`total Pass score was ${totalPass}`)
console.log(`total Fail score was ${totalFail}`)


const numbers = [1, 2, 3, 4, 5]

for (const num of numbers) {
  console.log(num)
}

