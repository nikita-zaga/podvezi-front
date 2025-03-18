import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "./useAuth.js";
import {useToast} from "vue-toastification";
import 'vue-toastification/dist/index.css'

export function useLogin() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const toast = useToast();

    onMounted(() => {
        if (isAuthenticated.value) {
            router.push("/trips");
        }
    });


    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.value, password: password.value }),
            });

            if (!response.ok) {
                throw new Error("Ошибка входа");
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.token);

            toast.success("Вход выполнен успешно!", { timeout: 2000 })
            router.push("/trips");
        } catch (err) {
            error.value = err.message;
        }
    };

    return { username, password, error, handleSubmit };
}
