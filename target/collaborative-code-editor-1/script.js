

function getCode() {
  fetch("/code").then(response => response.text()).then((code) => {
    document.getElementById('editor').innerText = code
  });
  fetch("/code").then(response => response.text()).then((name) => {
    document.getElementById('filename').innerText = name
  });
  console.log(code)
  console.log(name)
}