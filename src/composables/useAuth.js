import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useAuth() {
    const isAuthenticated = ref(false);
    const router = useRouter();

    const checkAuth = () => {
        const token = localStorage.getItem("authToken");
        isAuthenticated.value = !!token; // Если токен есть, пользователь авторизован
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        isAuthenticated.value = false;
        router.push("/login");
    };

    onMounted(checkAuth);

    return { isAuthenticated, logout };
}
