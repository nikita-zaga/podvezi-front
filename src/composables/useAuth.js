import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";
import 'vue-toastification/dist/index.css'

export function useAuth() {
    const isAuthenticated = ref(false);
    const router = useRouter();
    const toast = useToast();

    const checkAuth = () => {
        const token = localStorage.getItem("authToken");
        isAuthenticated.value = !!token;
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                console.error('Ошибка при выполнении logout:', response.statusText);
                return;
            }

            console.log('Вы успешно вышли');
            localStorage.removeItem("authToken");
            isAuthenticated.value = false;
            toast.success("Выход выполнен успешно", { timeout: 2000 })
            router.push("/login");
        } catch (error) {
            console.error('Ошибка при выполнении запроса logout:', error);
        }

        return { logout };
    };

    onMounted(checkAuth);

    return { isAuthenticated, logout };
}
