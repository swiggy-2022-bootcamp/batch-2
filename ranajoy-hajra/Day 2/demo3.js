marks = [90, 60, 70, 20, 38]
sum = 0
min = Number.MAX_VALUE
max = Number.MIN_VALUE
fails = 0
for (i = 0; i < marks.length; i++) {
    sum += marks[i];
    min = Math.min(marks[i], min)
    max = Math.max(marks[i], max)
    if (marks[i] < 40)
        fails++;
}
console.log('Sum: ' + sum + '\nMin: ' + min + '\nMax: ' + max + '\nPass: ' + (marks.length - fails) + '\nFails: ' + fails)