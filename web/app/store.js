login = function(email, password) {

    console.log('Logging in with email:', email, 'and password:', password);
    return ;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            alert('Login successful!');
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

};

register = function(name, email, password) {
    
    console.log('Registering with name:', name, 'email:', email, 'and password:', password);

    fetch('http://localhost:8080/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

loadAccounts = function() {
    // var token = localStorage.getItem('token');
    // token = 'eyJ';


    fetch('http://localhost:8080/accounts', {
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);
        if (data) {
            console.log('Accounts:', data);
            var accountsContainer = document.getElementById('accountsContainer');
            accountsContainer.innerHTML = ''; // Clear previous accounts
            data.forEach(account => {
                const accountElement = document.createElement('div');
                accountElement.textContent = `Account ID: ${account.id}, Name: ${account.name}`;
                accountsContainer.appendChild(accountElement);
            });
        } else {
            alert('Failed to retrieve accounts: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};