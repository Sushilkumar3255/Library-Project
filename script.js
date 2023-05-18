const myLibrary = [];
const table = document.querySelector("table");
const newBtn = document.querySelector("#new-btn");
const form = document.querySelector("form");

function Book({title, author, pages, readStatus}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeReadStatus = function() {
  if(this.readStatus === "Read") {
    this.readStatus = "Unread";
  }
  else {
    this.readStatus = "Read";
  }
}

const theHobbits = new Book(
  {
    title: "The Namesake",
    author: "Jhumpa Lahiri",
    pages: 295,
    readStatus: "Read"
  }
);

const harryPotter = new Book(
  {
    title: "A Suitable boy",
    author: "Vikram Seth",
    pages: 1349,
    readStatus: "Unread"
  }
);

myLibrary.push(theHobbits, harryPotter);

const addBookToLibrary = () => {
  const title = document.querySelector("#book-name").value;
  const author = document.querySelector("#author-name").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector(
    'input[name="read_status"]:checked'
  ).value;
  const newBook = new Book(
    {
      title,
      author,
      pages,
      readStatus
    }
  );
  myLibrary.push(newBook);
  displayBooks();
  form.style.display = "none";
}

const displayBooks = () => {
  if(myLibrary.length > 0) {
      table.innerHTML = `
      <tr class='table-heading'>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Pages</th>
        <th>Read Status</th>
        <th>Actions</th>
      </tr>
      `;
    for (var i = 0; i < myLibrary.length; i++) {
      rowEl = document.createElement("tr");
      rowEl.innerHTML = `
        <td>${myLibrary[i].title}</td>
        <td><i>${myLibrary[i].author}</i></td>
        <td>${myLibrary[i].pages}</td>
        <td class="${myLibrary[i].readStatus}">${myLibrary[i].readStatus}</td>
        <td>
          <div class="btns">
            <button class="rem-btn" onclick="removeBook(${i})"><img src="./Icon/delete.svg" alt="Delete Icon"></button>
            <button class="read-status-btn" onclick="changeReadStatus(${i})">Read/Unread</button>
          </div>
        </td>
      `;
      table.appendChild(rowEl);
    }
  }
  else {
    table.innerHTML = "";
  }
}

newBtn.addEventListener("click", () => {
  form.style.display = "block";
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  addBookToLibrary();
  form.reset();
});

const removeBook = (index) => {
  myLibrary.splice(index, 1);
  displayBooks();
}

const changeReadStatus = (index) => {
  myLibrary[index].changeReadStatus();
  displayBooks();
}

displayBooks();
