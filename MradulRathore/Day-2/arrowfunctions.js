const changeToUpperCase = arr => {
    const newArr = []
    for (const element of arr) {
        newArr.push(element.toUpperCase())
    }
    return newArr
}

const countries = ['India', 'America', 'Norway', 'Denmark', 'Iceland']
console.log(changeToUpperCase(countries))

  // ["FINLAND", "SWEDEN", "NORWAY", "DENMARK", "ICELAND"]