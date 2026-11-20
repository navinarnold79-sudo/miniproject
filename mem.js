// Get existing members from Local Storage or initialize defaults
let members = JSON.parse(localStorage.getItem("members")) || [
    { id: "M001", memberId: "M001", name: "John Doe", department: "Computer Science", email: "john.doe@example.com", mobile: "1234567890" },
    { id: "M002", memberId: "M002", name: "Jane Smith", department: "Mathematics", email: "jane.smith@example.com", mobile: "0987654321" },
    { id: "M003", memberId: "M003", name: "Alice Johnson", department: "Physics", email: "alice.johnson@example.com", mobile: "1122334455" }
];

if (!localStorage.getItem("members")) {
    localStorage.setItem("members", JSON.stringify(members));
}

// Form submit
const memberForm = document.getElementById("memberForm");
if (memberForm) {
    memberForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get values
        let memberId = document.getElementById("memberId").value.trim();
        let name = document.getElementById("name").value.trim();
        let department = document.getElementById("department").value.trim();
        let email = document.getElementById("email").value.trim();
        let mobile = document.getElementById("mobile").value.trim();

        // Required field validation
        if (!memberId || !name || !department || !email || !mobile) {
            alert("Please fill all required fields.");
            return;
        }

        // Email validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Mobile validation
        let mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Check duplicate Member ID
        let duplicate = members.some(member => (member.memberId === memberId || member.id === memberId));
        if (duplicate) {
            alert("Member ID already exists.");
            return;
        }

        // Create member object
        let member = {
            id: memberId,
            memberId: memberId,
            name: name,
            department: department,
            email: email,
            mobile: mobile
        };

        // Add member
        members.push(member);

        // Save to Local Storage
        localStorage.setItem("members", JSON.stringify(members));

        alert("Member added successfully!");

        // Clear form
        memberForm.reset();

        // Display members
        displayMembers();
    });
}

// Display members
function displayMembers() {
    let tableBody = document.getElementById("memberTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    members.forEach((member, index) => {
        let row = `
            <tr>
                <td>${member.memberId || member.id}</td>
                <td>${member.name}</td>
                <td>${member.department}</td>
                <td>${member.email}</td>
                <td>${member.mobile}</td>
                <td>
                    <button class="delete-btn" onclick="deleteMember(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Delete member
function deleteMember(index) {
    if (confirm("Are you sure you want to delete this member?")) {
        members.splice(index, 1);
        localStorage.setItem("members", JSON.stringify(members));
        displayMembers();
    }
}

// Load members when page opens
displayMembers();
