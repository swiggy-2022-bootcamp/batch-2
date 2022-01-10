const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user/signup', (req, res) => {
	res.send('Signed up successfully');
});

app.post('/user/login', (req, res) => {
	res.send('Logged in successfully');
});

app.put('user/id', (req, res) => {
	res.send('Updating user');
});

app.delete('user/id', (req, res) => {
	res.send('User deleted successfully');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})