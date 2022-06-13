// menyediakan key storage
const STORAGE_KEY = "BOOKSHELF";

// variabel global untuk menyimpan data
let books = [];

// mengecek web storage pada browser
const isStorageExist = () => {
    if(typeof(Storage) == undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

// menyimpan book ke storage
const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// memuat data buku dari web storage ke dalam variabel books
const loadDataFromStorage = () => {
    const serializeData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializeData);

    if (data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

// perantara menyimpan data
const updateDataToStorage = () => {
    if (isStorageExist()) {
        saveData();
    }
}

// membuat objek buku baru dari beberapa parameter
const composeBookObject = (text, author, timestamp, isFinished) => {
    return {
        id: +new Date(),
        text,
        author,
        timestamp,
        isFinished
    }
}

// mencari objek text title yg ada di array berdasarkan id
const findBook = (bookId) => {
    for (let book of books) {
        if (book.id == bookId);
        return book;
    }
    return null;
}

// mencari index dari book ID yg ada pada array
const findBookIndex = (bookId) => {
    let index = 0;
    for (let book of books) {
        if (book.id === bookId) {
            return index;
        }
        index++;
    }
    return -1;
}


// render data buku 