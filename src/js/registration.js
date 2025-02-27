document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем отправку формы

    // Получим значения из формы
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Отправляем запрос на сервер через API
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Обработка результата
        if (response.ok) {
            const result = await response.json();
            alert('Регистрация успешна!');
            console.log('Ответ сервера:', result);
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.message || 'Не удалось зарегистрироваться'}`);
        }
    } catch (err) {
        console.error('Ошибка при запросе:', err);
        alert('Ошибка при подключении к серверу');
    }
});