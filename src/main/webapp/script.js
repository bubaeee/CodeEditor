
function getName() {
    var myCodeMirror = CodeMirror(document.body);
    code = myCodeMirror.getValue()
    fetch("/name").then(response => response.text()).then((code) => {
    document.getElementById('editor').getValue = code;
    })

  fetch("/name").then(response => response.text()).then((name) => {
    document.getElementById('filename').innerText = name
  });
}