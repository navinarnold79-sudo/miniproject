// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadBooks();


    // ADD BOOK FORM

    const bookForm =
        document.getElementById("bookForm");


    bookForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // GET VALUES

        const book = {

            id: document.getElementById("bookId").value.trim(),

            name: document.getElementById("bookName").value.trim(),

            author: document.getElementById("author").value.trim(),

            category: document.getElementById("category").value,

            publisher: document.getElementById("publisher").value.trim(),

            year: document.getElementById("year").value,

            quantity: Number(document.getElementById("quantity").value) || 1,
            available: Number(document.getElementById("quantity").value) || 1,
            title: document.getElementById("bookName").value.trim()

        };


        // GET OLD BOOKS

        let books =
            JSON.parse(localStorage.getItem("books")) || [];


        // ADD NEW BOOK

        books.push(book);


        // SAVE BOOKS

        localStorage.setItem(
            "books",
            JSON.stringify(books)
        );


        // SUCCESS MESSAGE

        alert("✅ Book Added Successfully!");


        // CLEAR FORM

        bookForm.reset();


        // HIDE FORM

        document.getElementById(
            "addBookForm"
        ).style.display = "none";


        // REFRESH BOTH PLACES

        loadBooks();

    });

});



// ==========================================
// SHOW SECTION
// ==========================================

function showSection(sectionId, clickedItem) {

    event.preventDefault();


    // Hide sections

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    // Show selected section

    document.getElementById(
        sectionId
    ).classList.add("active-section");


    // Remove active menu

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    // Active menu

    if (clickedItem) {

        clickedItem.classList.add("active");

    }


    // Page title

    const titles = {

        dashboard: "Dashboard",

        books: "Books",

        members: "Members",

        issue: "Issue Book",

        return: "Return Book",

        reports: "Reports",

        about: "About"

    };


    document.getElementById(
        "pageTitle"
    ).textContent = titles[sectionId];

}



// ==========================================
// SHOW SECTION FROM BUTTON
// ==========================================

function showSectionByName(sectionId) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    document.getElementById(
        sectionId
    ).classList.add("active-section");


    document.getElementById(
        "pageTitle"
    ).textContent = "Books";


    // Books nav active

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    navItems[1].classList.add("active");

}



// ==========================================
// SHOW ADD BOOK FORM
// ==========================================

function showAddBookForm() {

    document.getElementById(
        "addBookForm"
    ).style.display = "block";

}



// ==========================================
// CANCEL
// ==========================================

function cancelAddBook() {

    document.getElementById(
        "addBookForm"
    ).style.display = "none";


    document.getElementById(
        "bookForm"
    ).reset();

}



// ==========================================
// LOAD BOOKS
// ==========================================

function loadBooks() {

    // Get books from localStorage

    const books =
        JSON.parse(
            localStorage.getItem("books")
        ) || [];


    // ==============================
    // DASHBOARD COUNT
    // ==============================

    document.getElementById(
        "totalBooks"
    ).textContent = books.length;



    // ==============================
    // BOOKS TABLE
    // ==============================

    const tableBody =
        document.getElementById(
            "booksTableBody"
        );


    tableBody.innerHTML = "";


    if (books.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="8"
                    style="text-align:center; padding:25px;">

                    📚 No books added yet.

                </td>

            </tr>

        `;

    }


    books.forEach(function (book, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${book.id}</td>

            <td>${book.name}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.publisher}</td>

            <td>${book.year}</td>

            <td>${book.quantity}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteBook(${index})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });



    // ==============================
    // DASHBOARD RECENT BOOKS
    // ==============================

    const dashboardBooks =
        document.getElementById(
            "dashboardBooks"
        );


    dashboardBooks.innerHTML = "";


    if (books.length === 0) {

        dashboardBooks.innerHTML = `

            <div class="recent-book-card">

                <h3>📚 No Books Yet</h3>

                <p>
                    Add your first book from
                    the Books section.
                </p>

            </div>

        `;

        return;

    }


    // Last 3 books

    const recentBooks =
        books.slice(-3).reverse();


    recentBooks.forEach(function (book) {

        const card =
            document.createElement("div");


        card.className =
            "recent-book-card";


        card.innerHTML = `

            <h3>
                📖 ${book.name}
            </h3>

            <p>
                👤 ${book.author}
            </p>

            <p>
                🏷️ ${book.category}
            </p>

            <p>
                📦 Quantity: ${book.quantity}
            </p>

        `;


        dashboardBooks.appendChild(card);

    });

}



// ==========================================
// DELETE BOOK
// ==========================================

function deleteBook(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) {

        return;

    }


    let books =
        JSON.parse(
            localStorage.getItem("books")
        ) || [];


    books.splice(index, 1);


    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );


    loadBooks();


    alert("🗑️ Book Deleted Successfully!");

}



// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("username");

}
