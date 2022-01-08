// Task
const EvenOdd = num => {
    if (num % 2) 
        console.log("Odd Number");
    else 
        console.log("Even Number");
  };
  
  EvenOdd(10);
  
  const user = {
    username: "Pradyuman",
    password: "pass",
  };
  
  let { username, password } = user;
  
  console.log(username);
  console.log(password);