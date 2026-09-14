const BASE_URL = 'http://localhost:8080';

register = function(name, email, password) {
    
    console.log('Registering with name:', name, 'email:', email, 'and password:', password);

    fetch(`${BASE_URL}/auth/register`, {
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


    fetch(`${BASE_URL}/accounts`, {
        method: 'GET',
        credentials: 'include',
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


login = function(email, password) {

    console.log('Logging in with email:', email, 'and password:', password);

    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(data => {
        console.log('Data received:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

};

getProfile = function() {
    fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'id-account': 'to roubando o id-account do usuário logado',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Profile data received:', data);
        if (data) {
            var profileContainer = document.getElementById('profileContainer');
            profileContainer.innerHTML = `Name: ${data.name}, Email: ${data.email}`;
        } else {
            alert('Failed to retrieve profile: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

logout = function() {
    fetch(`${BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(data => {
        console.log('Logout response:', data);
        if (data.success) {
            window.location.href = '/login.html'; // Redirect to login page after logout
        } else {
            alert('Logout failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};