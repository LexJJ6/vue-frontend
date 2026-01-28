import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardHome from "@/components/DashboardHome.vue";
import AddProductForm from "@/components/AddProductForm.vue";
import EditProductForm from "@/components/EditProductForm.vue";

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
                    path: 'products/add',
                    name: 'add-product',
                    component: AddProductForm
                },
                {
                    path: 'products/edit/:id',
                    name: 'edit-product',
                    component: EditProductForm
                },
            ]
        },
    ]
});

export default router;