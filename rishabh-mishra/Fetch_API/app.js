//Add Event Listener for text data
document.querySelector('#button1').addEventListener('click', getData);
//Add Event Listener for JSON data
document.querySelector('#button2').addEventListener('click', getJSON);
//Add Event Listener for API data
document.querySelector('#button3').addEventListener('click', getAPIData);

//Get Data from local file
function getData() {
  fetch('data.txt')
    .then((res) => res.text())
    .then((data) => {
      document.querySelector('#output').innerHTML = data;
    })
    .catch((err) => console.log(err));
}

//Get local JSON Data
function getJSON() {
  fetch('posts.json')
    .then((res) => res.json())
    .then((data) => {
      let output = '';
      data.forEach(function (post) {
        output += `<li>${post.title}</li>`;
      });
      document.querySelector('#output').innerHTML = output;
    })
    .catch((err) => console.log(err));
}

// Get API data
function getAPIData() {
  fetch('https://api.github.com/users')
    .then((res) => res.json())
    .then((data) => {
      let output = '';
      data.forEach(function (users) {
        output += `<li>${users.login}</li>`;
      });
      document.querySelector('#output').innerHTML = output;
    })
    .catch((err) => console.log(err));
}
