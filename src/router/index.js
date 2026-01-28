import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardHome from "@/components/DashboardHome.vue";
import ProductPage from "@/views/ProductPage.vue";

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
                    name: 'dashboard-home', // onde aparecem os produtos todos
                    component: DashboardHome
                },
                {
                    path: 'products/:id',
                    name: 'product-page',
                    component: ProductPage
                },
                {
                    path: 'products/:id',
                    name: 'product-page',
                    component: ProductPage
                },
            ]
        },
    ]
});

export default router;