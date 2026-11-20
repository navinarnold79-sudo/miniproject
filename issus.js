// ---------- Local Storage helpers ----------
// Unga Book/Member module keys vera-na inga mattum maathunga
function getBooks()   { return JSON.parse(localStorage.getItem("books")   || "[]"); }
function getMembers() { return JSON.parse(localStorage.getItem("members") || "[]"); }
function getIssues()  { return JSON.parse(localStorage.getItem("issues")  || "[]"); }
function saveBooks(d)  { localStorage.setItem("books", JSON.stringify(d)); }
function saveIssues(d) { localStorage.setItem("issues", JSON.stringify(d)); }

// ---------- Sample data (testing-ku mattum, data illana) ----------
if (getBooks().length === 0) {
  saveBooks([
    { id: 1, name: "Wings of Fire", quantity: 3 },
    { id: 2, name: "Ponniyin Selvan", quantity: 1 },
    { id: 3, name: "Clean Code", quantity: 0 }
  ]);
}
if (getMembers().length === 0) {
  localStorage.setItem("members", JSON.stringify([
    { id: 1, name: "Arun" }, { id: 2, name: "arnold" }, { id: 3, name: "Karthik" }
  ]));
}

// ---------- Elements ----------
const memberSel  = document.getElementById("member");
const bookSel    = document.getElementById("book");
const issueDate  = document.getElementById("issueDate");
const returnDate = document.getElementById("returnDate");
const message    = document.getElementById("message");
const goReturn   = document.getElementById("goReturn");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "msg " + type;
}

// ---------- Dropdowns fill pannum (2 datasets-a read pannudhu) ----------
function loadDropdowns() {
  memberSel.innerHTML = '<option value="">-- Select Member --</option>';
  getMembers().forEach(m => {
    memberSel.innerHTML += `<option value="${m.id}">${m.name}</option>`;
  });

  bookSel.innerHTML = '<option value="">-- Select Book --</option>';
  getBooks().forEach(b => {
    const out = b.quantity <= 0;
    bookSel.innerHTML += `<option value="${b.id}" ${out ? "disabled" : ""}>${b.name} (Available: ${b.quantity})</option>`;
  });
}

// Default: issue date = innaiku, return date = 14 naal aprm
function setDefaultDates() {
  issueDate.value = new Date().toISOString().split("T")[0];
  const d = new Date();
  d.setDate(d.getDate() + 14);
  returnDate.value = d.toISOString().split("T")[0];
}

// ---------- Issue Book ----------
document.getElementById("issueForm").addEventListener("submit", function (e) {
  e.preventDefault();
  goReturn.style.display = "none";

  const books   = getBooks();
  const members = getMembers();

  // 1. Fields fill pannirukkangala?
  if (!memberSel.value || !bookSel.value || !issueDate.value || !returnDate.value) {
    return showMessage("Please fill all the fields.", "error");
  }
  if (returnDate.value < issueDate.value) {
    return showMessage("Return date cannot be before issue date.", "error");
  }

  // 2. Member & Book exist aagudha? (cross-reference)
  const member = members.find(m => String(m.id) === memberSel.value);
  const book   = books.find(b => String(b.id) === bookSel.value);
  if (!member) return showMessage("Selected member does not exist.", "error");
  if (!book)   return showMessage("Selected book does not exist.", "error");

  // 3. Quantity > 0 ah? (availability check)
  if (book.quantity <= 0) {
    return showMessage(`Sorry, "${book.name}" is currently unavailable.`, "error");
  }

  // 4. Referential update: book quantity kuraikkum + issue record save
  book.quantity -= 1;
  saveBooks(books);

  const issues = getIssues();
  issues.push({
    id: Date.now(),
    memberId: member.id,
    memberName: member.name,
    bookId: book.id,
    bookName: book.name,
    issueDate: issueDate.value,
    returnDate: returnDate.value,
    status: "Issued",
    returnedOn: null
  });
  saveIssues(issues);

  // 5. Success message + Return page link
  showMessage(`"${book.name}" issued to ${member.name} successfully!`, "success");
  goReturn.style.display = "inline-block";
  loadDropdowns();
  setDefaultDates();
});

loadDropdowns();
setDefaultDates();