import { ref } from "vue";
import { useRouter } from "vue-router";

export function useLogin() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.value, password: password.value }),
            });

            if (response.ok) {
                alert("Вход выполнен!");
                router.push("/dashboard"); // Перенаправляем на защищённую страницу
            } else {
                alert("Ошибка входа");
            }
        } catch (err) {
            alert("Ошибка сервера");
        }
    };

    return { username, password, handleSubmit };
}
