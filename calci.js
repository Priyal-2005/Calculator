let buttons = document.querySelector(".buttons");
let btn = document.querySelectorAll("span");
let value = document.querySelector("#value");
let toggleBtn = document.querySelector(".toggleBtn");
let body = document.querySelector("body");

value.textContent = ""; // Start with an empty screen

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        let input = this.textContent;

        if (input === "=") {
            if (value.textContent.trim() === "") return; // Prevent evaluation on empty input
            try {
                value.textContent = Function(`"use strict"; return (${value.textContent})`)();
            } catch {
                value.textContent = "Error"; // Handle invalid expressions
            }
        } else if (input === "AC") {
            value.textContent = "";
        } else if (input === "Del") {
            value.textContent = value.textContent.slice(0, -1); // Remove last character
        } else {
            let lastChar = value.textContent.slice(-1);

            // Prevent multiple consecutive operators
            if (["+", "-", "*", "/"].includes(input) && ["+", "-", "*", "/"].includes(lastChar)) {
                return;
            }

            // Prevent starting with *, /, or +
            if (["+", "*", "/"].includes(input) && value.textContent === "") {
                return;
            }

            value.textContent += input;
        }
    });
}

toggleBtn.onclick = () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
};

// Preserve theme preference on page load
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
}