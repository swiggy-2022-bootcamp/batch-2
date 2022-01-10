class easyHttp {
  // Make a GET request
  get(url) {
    return new Promise((reject, resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  // Make a POST request
  post(url, data) {
    return new Promise((reject, resolve) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  // Make a PUT request
  put(url, data) {
    return new Promise((reject, resolve) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  // Make a DELETE request
  delete(url) {
    return new Promise((reject, resolve) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => resolve('Users credentials deleted !!!'))
        .catch((err) => reject(err));
    });
  }
}
