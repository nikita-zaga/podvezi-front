document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения из формы
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Отправляем запрос на сервер
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Обработка ответа
        if (response.ok) {
            const result = await response.json();
            alert('Вход успешен!');
            console.log('Ответ сервера:', result);
            // Перенаправление на главную страницу после успешного входа
            window.location.href = '/home.html';
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.message || 'Не удалось войти'}`);
        }
    } catch (err) {
        console.error('Ошибка при запросе:', err);
        alert('Ошибка при подключении к серверу');
    }
});
