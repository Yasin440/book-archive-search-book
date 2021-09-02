// global variable
const getInput = document.getElementById("search-input");
const bookCardHolder = document.getElementById("bookCard");
const resultNum = document.getElementById("searchFound");
const spinner = document.getElementById('spinner');
// spinner..
const displaySpinner = value => {
    spinner.style.display = value;
}
//search onclick array funcrion
const searchBook = () => {
    // clear previous search result
    bookCardHolder.innerHTML = "";
    resultNum.innerText = "";
    // spinner
    displaySpinner("block");
    //warning
    const getInputValue = getInput.value;
    if (getInputValue === '') {
        resultNum.innerText = 'Please Enter a Book Name First..!!!';
        // spinner
        displaySpinner("none");
        return;
    }

    // get API
    fetch(`http://openlibrary.org/search.json?q=${getInputValue}`)
        .then(res => res.json())
        .then(data => getBooks(data.docs))
    getInput.value = "";
}
const getBooks = books => {
    //warning
    if (books < '0') {
        resultNum.innerText = 'NO Result Found With Your Kaywords..!!!';
        // spinner
        displaySpinner("none");
        return;
    }
    books.forEach(book => {
        // search result
        resultNum.innerText = `${books.length}`;
        // search card result
        const div = document.createElement('div');
        div.classList.add("col-4");
        div.innerHTML = `
                        <div class="card">
                            <img height="450px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title text-primary">${book.title}</h5>
                                <p class="fw-bold">Author:<span class="text-primary"> ${book.author_name}</span></p>
                                <p class="fw-bold">1st publish:<span class="text-primary"> ${book.first_publish_year}</span></p>
                            </div>
                        </div>  
        `;
        bookCardHolder.appendChild(div);
        // spinner
        displaySpinner("none");
    });
}

