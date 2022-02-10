const content = document.querySelector(".content");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage({ author: this.author.value, content: this.message.value });
  form.reset();
});

function displayAll() {
  fetch("http://localhost/cyclisterie/?type=message&action=index")
      .then((res) => res.json())
      .then((messages) => {
        content.innerHTML = "";
        messages.reverse().forEach((message) => {
          content.innerHTML += templateMessage(message);
          content.querySelector(".delBtn").addEventListener("click", function() {
            deleteMessage({id: this.id})
          });
        });
      })
}

// CRUD
const sendMessage = (body) => {
  fetch("http://localhost/cyclisterie/?type=message&action=new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      displayAll();
    });
};

function deleteMessage(id) {
  fetch("http://localhost/cyclisterie/?type=message&action=del", {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(id),
  })
      .then((res)=>res.json())
      .then((data)=> {
        console.log(data)
        displayAll();
      })
}

// TEMPLATES
const templateMessage = (message) => {
  template = `<div class="mt-5 me-5 p-2 card">
  <div>
    <button id="${message.id}" class="btn btn-danger delBtn">X</button>
  </div>
    <h3>${message.author}</h3>
    <p>${message.content}</p>
    </div>`;
  return template;
};

displayAll();





