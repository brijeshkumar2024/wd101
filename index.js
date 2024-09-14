document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const userTableBody = document.getElementById('user-table-body');
    
    // Load existing data from local storage
    function loadTable() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            Object.values(user).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            userTableBody.appendChild(row);
        });
    }

    loadTable();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validate date of birth
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const month = today.getMonth() - dobDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old.');
            return;
        }
        
        // Save data to local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name, email, password, dob, termsAccepted });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Reload table
        loadTable();
        
        // Clear the form
        form.reset();
    });
});
