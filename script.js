document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    function saveExpenses(expenses) {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function getExpenses() {
        return JSON.parse(localStorage.getItem('expenses')) || [];
    }

    function addExpenseToDOM(expense) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${expense.description} - $${expense.amount} <em>(${expense.category})</em>
            <button class="btn btn-danger btn-sm delete-expense">X</button>
        `;
        expenseList.appendChild(li);
    }

    function loadExpenses() {
        expenseList.innerHTML = '';
        const expenses = getExpenses();
        expenses.forEach(expense => addExpenseToDOM(expense));
    }

    function addExpense(amount, description, category) {
        const expenses = getExpenses();
        expenses.push({ amount, description, category });
        saveExpenses(expenses);
        addExpenseToDOM({ amount, description, category });
    }

    function deleteExpense(element) {
        if (element.classList.contains('delete-expense')) {
            const li = element.parentElement;
            const description = li.firstChild.textContent.split(' - ')[0].trim();
            let expenses = getExpenses();
            expenses = expenses.filter(expense => expense.description !== description);
            saveExpenses(expenses);
            li.remove();
        }
    }

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        addExpense(amount, description, category);
        expenseForm.reset();
    });

    expenseList.addEventListener('click', function(e) {
        deleteExpense(e.target);
    });

    loadExpenses();
});
