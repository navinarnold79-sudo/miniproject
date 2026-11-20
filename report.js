
const books = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "Python Programming", quantity: 5, available: 4 },
    { id: 2, title: "Web Development", quantity: 3, available: 2 }
];

const members = JSON.parse(localStorage.getItem("members")) || [
    { id: 1, name: "Navin" },
    { id: 2, name: "Arun" }
];

const issues = JSON.parse(localStorage.getItem("issues")) || [
    { id: 1, bookId: 1, memberId: 1, status: "Issued" },
    { id: 2, bookId: 2, memberId: 2, status: "Issued" }
];

// Save initial data if it does not exist
if (localStorage.getItem("books") === null) {
    localStorage.setItem("books", JSON.stringify(books));
}

if (localStorage.getItem("members") === null) {
    localStorage.setItem("members", JSON.stringify(members));
}

if (localStorage.getItem("issues") === null) {
    localStorage.setItem("issues", JSON.stringify(issues));
}

function updateReports() {

    let totalBooks = 0;
    let totalMembers = 0;
    let availableBooks = 0;
    let issuedBooks = 0;

    // Count total and available book copies
    for (let i = 0; i < books.length; i++) {
        totalBooks += Number(books[i].quantity) || 0;
        availableBooks += Number(books[i].available) || 0;
    }

    // Count total members
    for (let i = 0; i < members.length; i++) {
        totalMembers++;
    }

    // Count currently issued books
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status === "Issued") {
            issuedBooks++;
        }
    }

    // Display report values
    document.getElementById("totalBooks").textContent = totalBooks;

    document.getElementById("totalMembers").textContent = totalMembers;

    document.getElementById("availableBooks").textContent = availableBooks;

    document.getElementById("issuedBooks").textContent = issuedBooks;
}

// Display reports when the page opens
updateReports();
