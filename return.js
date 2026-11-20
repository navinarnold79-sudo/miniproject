// ---------- Local Storage helpers (issue.js-oda same keys) ----------
function getBooks()   { return JSON.parse(localStorage.getItem("books")   || "[]"); }
function getMembers() { return JSON.parse(localStorage.getItem("members") || "[]"); }
function getIssues()  { return JSON.parse(localStorage.getItem("issues")  || "[]"); }
function saveBooks(d)  { localStorage.setItem("books", JSON.stringify(d)); }
function saveIssues(d) { localStorage.setItem("issues", JSON.stringify(d)); }

const issueTable  = document.getElementById("issueTable");
const bookSummary = document.getElementById("bookSummary");
const message     = document.getElementById("message");

function today() { return new Date().toISOString().split("T")[0]; }

function showMessage(text, type) {
  message.textContent = text;
  message.className = "msg " + type;
}

// ---------- Dynamic table: ellaa issue records ----------
function renderIssues() {
  const issues = getIssues();
  issueTable.innerHTML = "";

  if (issues.length === 0) {
    issueTable.innerHTML = '<tr><td colspan="6" class="empty">No books issued yet.</td></tr>';
    return;
  }

  // loop: latest record mela varum
  for (let i = issues.length - 1; i >= 0; i--) {
    const r = issues[i];
    const isIssued = r.status === "Issued";
    const overdue = isIssued && r.returnDate < today();

    issueTable.innerHTML += `
      <tr>
        <td>${r.memberName}</td>
        <td>${r.bookName}</td>
        <td>${r.issueDate}</td>
        <td class="${overdue ? "overdue" : ""}">${r.returnDate}${overdue ? " (Overdue)" : ""}</td>
        <td><span class="tag ${isIssued ? "issued" : "returned"}">${r.status}</span></td>
        <td>${isIssued
          ? `<button onclick="returnBook(${r.id})">Return</button>`
          : "Returned on " + r.returnedOn}</td>
      </tr>`;
  }
}

// ---------- Return Book: stored data update ----------
function returnBook(issueId) {
  const issues = getIssues();
  const books  = getBooks();

  // issue record-a kandupidikkum
  const record = issues.find(r => r.id === issueId);
  if (!record || record.status !== "Issued") {
    return showMessage("Issue record not found or already returned.", "error");
  }

  // 1. book quantity 1 increase
  const book = books.find(b => b.id === record.bookId);
  if (book) {
    book.quantity += 1;
    saveBooks(books);
  }

  // 2. issue record close
  record.status = "Returned";
  record.returnedOn = today();
  saveIssues(issues);

  // 3. screen refresh
  showMessage(`"${record.bookName}" returned by ${record.memberName} successfully!`, "success");
  renderIssues();
  renderReports();
}

// ---------- Reports: loops + counters ----------
function renderReports() {
  const books   = getBooks();
  const members = getMembers();
  const issues  = getIssues();

  let availableBooks = 0;   // counter 1
  let issuedBooks    = 0;   // counter 2
  let totalMembers   = 0;   // counter 3

  // Available = ellaa books-oda quantity sum
  for (let i = 0; i < books.length; i++) {
    availableBooks += Number(books[i].quantity);
  }

  // Issued = status "Issued" irukkura records count
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].status === "Issued") {
      issuedBooks++;
    }
  }

  // Members count
  for (let i = 0; i < members.length; i++) {
    totalMembers++;
  }

  // Total copies = shelf-la irukkradhu + members kitta irukkradhu
  const totalBooks = availableBooks + issuedBooks;

  document.getElementById("totalBooks").textContent     = totalBooks;
  document.getElementById("totalMembers").textContent   = totalMembers;
  document.getElementById("availableBooks").textContent = availableBooks;
  document.getElementById("issuedBooks").textContent    = issuedBooks;

  renderBookSummary(books, issues);
}

// ---------- Dynamic summary table: book-wise ----------
function renderBookSummary(books, issues) {
  bookSummary.innerHTML = "";

  if (books.length === 0) {
    bookSummary.innerHTML = '<tr><td colspan="3" class="empty">No books found.</td></tr>';
    return;
  }

  for (let i = 0; i < books.length; i++) {
    let issuedCount = 0;                       // counter per book
    for (let j = 0; j < issues.length; j++) {
      if (issues[j].bookId === books[i].id && issues[j].status === "Issued") {
        issuedCount++;
      }
    }
    bookSummary.innerHTML += `
      <tr>
        <td>${books[i].name}</td>
        <td>${books[i].quantity}</td>
        <td>${issuedCount}</td>
      </tr>`;
  }
}

renderIssues();
renderReports();