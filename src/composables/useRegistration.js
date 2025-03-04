import { ref } from "vue";
import { useRouter } from "vue-router";

export function useRegistration() {
    const username = ref("");
    const password = ref("");
    const selectedRole = ref("");
    const router = useRouter();

    const driverInfo = ref({
        experience: null,
        car: {
            model: "",
            number: "",
            color: "",
        },
    });


    const handleSubmit = async () => {
        console.log("Начало handleSubmit");
        if (!selectedRole.value) {
            alert("Выберите роль перед регистрацией!");
            return;
        }

        console.log("Отправляемые данные:", driverInfo.value);
        // Формируем объект для отправки
        const body = {
            username: username.value,
            password: password.value,
            role: selectedRole.value.id,
        };

        if (selectedRole.value.id === "driver") {
            body.experience = driverInfo.value.experience;
            body.car = driverInfo.value.car;
        }

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert("Регистрация успешна!");
                router.push("/login");
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.message || "Не удалось зарегистрироваться"}`);
            }
        } catch (err) {
            console.log("Ошибка при регистрации", err);
            alert("Ошибка сервера");
        }
    };

    return { username, password, selectedRole, driverInfo, handleSubmit };
}
