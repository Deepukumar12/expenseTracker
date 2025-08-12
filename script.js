

document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Save expenses to localStorage
    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Update total
    function updateTotal() {
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    // Render all expenses
    function renderExpenses() {
        expenseList.innerHTML = "";

        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${expense.name}</span>
                <span>
                    ₹${expense.amount.toFixed(2)} 
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </span>
            `;
            expenseList.appendChild(li);
        });

        // li.textContent = `${expense.name} - ₹${expense.amount.toFixed(2)}`;


        attachDeleteHandlers();
        updateTotal();
    }

    // Add new expense
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name === "" || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid name and amount.");
            return;
        }

        expenses.push({ name, amount });
        saveExpenses();
        renderExpenses();

        expenseNameInput.value = "";
        expenseAmountInput.value = "";
    });

    // Delete button handler
    function attachDeleteHandlers() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = parseInt(button.getAttribute("data-index"));
                expenses.splice(index, 1);
                saveExpenses();
                renderExpenses();
            });
        });
    }

    // Initial load
    renderExpenses();



        const darkToggle = document.getElementById("dark-toggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        darkToggle.textContent = " Light Mode";
    }

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        darkToggle.textContent = isDark ? " Light Mode" : " Dark Mode";
    });

});
