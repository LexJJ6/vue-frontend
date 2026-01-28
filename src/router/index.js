import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardHome from "@/components/DashboardHome.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            children: [
                {
                    path: '',
                    name: 'dashboard-home',
                    component: DashboardHome
                },
                {
                    path: 'product/:id',
                    // component: product detail
                }
            ]
        },
    ]
});

export default router;