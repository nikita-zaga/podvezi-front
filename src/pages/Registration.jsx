import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert("Регистрация успешна!");
                navigate("/login"); // Перенаправляем на логин
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.message || "Не удалось зарегистрироваться"}`);
            }
        } catch (err) {
            alert("Ошибка сервера");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-2 rounded"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="border p-2 w-full mb-4 rounded"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full transition"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );

}
