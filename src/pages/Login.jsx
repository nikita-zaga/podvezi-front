import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert("Вход выполнен!");
                navigate("/dashboard"); // Перенаправляем на защищённую страницу
            } else {
                alert("Ошибка входа");
            }
        } catch (err) {
            alert("Ошибка сервера");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Вход</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-2"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">
                    Войти
                </button>
            </form>
        </div>
    );
}
