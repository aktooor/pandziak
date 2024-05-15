const kafelki = document.querySelectorAll('.rozmiar');

function wybierzKafelek() {
    kafelki.forEach(kafel => {
        kafel.classList.remove('selected');
    });

    this.classList.add('selected');
}

kafelki.forEach(kafel => {
    kafel.addEventListener('click', wybierzKafelek);

    function zaznaczDomyslnyRozmiar() {
        const domyslnyRozmiar = document.querySelector('.rozmiar[data-rozmiar="35"]');
        if (domyslnyRozmiar) {
            domyslnyRozmiar.classList.add('selected');
        }
    }

    window.addEventListener('load', zaznaczDomyslnyRozmiar);
});

document.addEventListener("DOMContentLoaded", function () {
    const productsMenu = document.querySelector('.products-menu');
    const productsDropdown = document.querySelector('.products-dropdown');

    productsMenu.addEventListener('mouseover', function () {
        productsDropdown.style.display = 'block';
    });

    productsMenu.addEventListener('mouseout', function () {
        productsDropdown.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const baseURL = window.location.origin;

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${baseURL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();
                document.getElementById('message').innerText = data.message;

                if (response.status === 201) {
                    window.location.href = `${baseURL}/login.html`;
                } else {
                    document.getElementById('message').innerText = data.message;
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${baseURL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();
                document.getElementById('message').innerText = data.message;

                if (response.status === 200) {
                    localStorage.setItem('username', data.username);
                    window.location.href = `${baseURL}/index.html`;
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }

    const username = localStorage.getItem('username');
    const authLinks = document.getElementById('auth-links');

    if (username) {
        authLinks.innerHTML = `
            <a href="#" class="logoutbtn" id="logout">Wyloguj się</a>
        `;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.href = `${baseURL}/index.html`;
        });
    }
});
