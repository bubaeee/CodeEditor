
function getName() {
    code = editor.getValue();
    console.log(code);
    fetch("/name").then(response => response.text()).then((code) => {
    document.getElementById('editor').getValue = code;
    })

    // fetch("/download").then(response => response.text()).then((toGet) => {
    // document.getElementById('fileToGet').getValue = toGet;
    // })

  fetch("/name").then(response => response.text()).then((name) => {
    document.getElementById('filename').innerText = name
  });
}

// function putCode() {
//   fetch('/name').then(response => response.json()).then((code) => {
//     //const editor = document.getElementById('editor');
//     // tasks.forEach((task) => {
//     //   taskListElement.appendChild(createTaskElement(task));
//     // })
//     //var myCode = JSON.stringify(code);
//     editor.getDoc().setValue(myCode);
//   });
// }