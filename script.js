const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            alert("Login form submitted successfully!");
        }
         if (email && password) {
            window.location.href="dashboard.html";
         }
         else{
            alert("please enter email and password");
         }
    });
}
