import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useAuth() {
    const isAuthenticated = ref(false);
    const router = useRouter();

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
            router.push("/login");
        } catch (error) {
            console.error('Ошибка при выполнении запроса logout:', error);
        }

        return { logout };
    };

    onMounted(checkAuth);

    return { isAuthenticated, logout };
}
