import { ref } from "vue";
import { useRouter } from "vue-router";

export function useRegistration() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.value, password: password.value }),
            });

            if (response.ok) {
                alert("Регистрация успешна!");
                router.push("/login"); // Перенаправляем на страницу входа
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.message || "Не удалось зарегистрироваться"}`);
            }
        } catch (err) {
            alert("Ошибка сервера");
        }
    };

    return { username, password, handleSubmit };
}
