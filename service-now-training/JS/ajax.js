var xhr = new XMLHttpRequest();

xhr.open("GET", "./api/users");

xhr.onload = function () {
  if (xhr.status === 200) {
    // The request was successful
    console.log('success');
  } else {
    // The request has failed
    console.log('failed');
  }
};
