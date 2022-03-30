//variabel book finished and unfinished
const unfinishedBook = document.getElementById("incompleteBookshelfList");
const finishedBook = document.getElementById("completeBookshelfList");

//menyimpan value buku yang diinput
function addBook() {

    const title = document.getElementById("inputBookTitle").value;
    const writer = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const book = makeList(title, writer, year);

    unfinishedBook.append(book);
}

//menampilkan buku di rak
function makeList(text, author, timestamp, isFinished) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = text;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textTimestamp = document.createElement("p");
    textTimestamp.classList.add("year")
    textTimestamp.innerText = timestamp;

    const container = document.createElement("div");
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textTimestamp);

    if(isFinished) {
        container.append(createUndoButton(), createDeleteButton());
    } else {
        container.append(createFinishedButton(), createDeleteButton());
    }

    return container;
}

//membuat tombol
function createButton(buttonTypeClass, textButton, eventListener){

    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function(event) {
        eventListener(event);
    });

    return button;
}

//memindahkan buku dari 'belum selesai' dibaca ke 'selesai dibaca'
function addBookToFinished(bookElement) {

    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > p").innerText;
    const bookYear = bookElement.querySelector(".book_item > .year").innerText;
    const newBook = makeList(bookTitle, bookAuthor, bookYear, true);

    finishedBook.append(newBook);
    bookElement.remove();
}

//tombol selesai dibaca
function createFinishedButton() {
    return createButton("green", "Selesai Dibaca", function(event){
        addBookToFinished(event.target.parentElement);
    });
}

//menghapus buku
function removeBookFromFinished(bookElement) {
    bookElement.remove();
}

//tombol menghapus buku
function createDeleteButton() {
    return createButton("red", "Hapus Buku", function(event) {
        removeBookFromFinished(event.target.parentElement);
    });
}

//memindahkan buku dari 'selesai dibaca' ke belum 'selesai dibaca'
function undoBookFromFinished(bookElement){

    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > p").innerText;
    const bookYear = bookElement.querySelector(".book_item > .year").innerText;
    const newBook = makeList(bookTitle, bookAuthor, bookYear, false);
    
    unfinishedBook.append(newBook);
    bookElement.remove();
}

//tombol undo button (memindahkan dari 'selesai dibaca' ke belum selesai dibaca')
function createUndoButton() {
    return createButton("green", "Belum Selesai Dibaca", function(event) {
        undoBookFromFinished(event.target.parentElement);
    });
}
